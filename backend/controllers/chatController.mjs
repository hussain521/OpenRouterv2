import { User, Provider, Model, Usage } from '../models/index.mjs';
import axios from 'axios';

// Helper function to get token counts (this is a placeholder and needs a proper implementation)
// In a real-world scenario, you'd use a library or a more sophisticated method
// to count tokens based on the specific model's tokenizer.
const getTokenCount = (text) => {
  if (typeof text !== 'string' || !text.trim()) {
    return 0;
  }

  return text.split(/\s+/).filter(Boolean).length;
};

// Helper function to calculate cost
const calculateCost = (modelPricing, promptTokens, completionTokens) => {
  const promptCost = (promptTokens || 0) * (modelPricing?.prompt || 0);
  const completionCost = (completionTokens || 0) * (modelPricing?.completion || 0);
  return promptCost + completionCost;
};

// @desc    Send chat completion request to a provider
// @route   POST /api/chat/completions
// @access  Private
export const chatCompletion = async (req, res) => {
  const { model: requestedModelName, messages, stream = false } = req.body;

  if (
    typeof requestedModelName !== 'string' ||
    !requestedModelName.trim() ||
    !Array.isArray(messages) ||
    messages.length === 0
  ) {
    return res.status(400).json({ msg: 'Model and messages are required' });
  }

  const normalizedModelName = requestedModelName.trim();

  try {
    let model = await Model.findOne({ name: normalizedModelName }).populate('provider');

    if (!model && normalizedModelName.includes('/')) {
      const [providerName, ...modelNameParts] = normalizedModelName.split('/');
      const modelNameWithoutProvider = modelNameParts.join('/').trim();

      if (providerName && modelNameWithoutProvider) {
        const provider = await Provider.findOne({
          name: new RegExp(`^${providerName}$`, 'i'),
        });

        if (provider) {
          model = await Model.findOne({
            name: modelNameWithoutProvider,
            provider: provider._id,
          }).populate('provider');
        }
      }
    }

    if (!model) {
      return res.status(404).json({ msg: `Model '${normalizedModelName}' not found or not configured.` });
    }

    const provider = model.provider;
    if (!provider) {
      return res.status(404).json({ msg: 'Provider not found for the model' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const estimatedPromptTokens = messages.reduce(
      (total, message) => total + getTokenCount(typeof message?.content === 'string' ? message.content : ''),
      0
    );
    const estimatedCompletionTokens = estimatedPromptTokens;
    const estimatedCost = calculateCost(model.pricing, estimatedPromptTokens, estimatedCompletionTokens);

    if (user.balance < estimatedCost) {
      return res.status(400).json({ msg: 'Insufficient balance' });
    }

    const providerRequestUrl = `${provider.baseUrl}/v1/chat/completions`;
    const providerRequestBody = {
      model: model.name,
      messages,
      stream,
    };

    const providerResponse = await axios.post(providerRequestUrl, providerRequestBody, {
      headers: {
        Authorization: `Bearer ${provider.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    let responseContent = '';
    let actualPromptTokens = 0;
    let actualCompletionTokens = 0;

    if (stream) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.write('event: message\n');
      res.write('data: {"message": "Streaming is not fully implemented yet. Please check logs for details."}\n\n');
      res.end();
      return;
    }

    if (providerResponse.data && Array.isArray(providerResponse.data.choices) && providerResponse.data.choices.length > 0) {
      responseContent = providerResponse.data.choices[0]?.message?.content || '';
      actualPromptTokens =
        providerResponse.data.usage?.prompt_tokens ||
        getTokenCount(messages.map((message) => (typeof message?.content === 'string' ? message.content : '')).join('\n'));
      actualCompletionTokens =
        providerResponse.data.usage?.completion_tokens || getTokenCount(responseContent);
    } else {
      actualPromptTokens = estimatedPromptTokens;
      actualCompletionTokens = estimatedCompletionTokens;
    }

    const actualCost = calculateCost(model.pricing, actualPromptTokens, actualCompletionTokens);

    user.balance -= actualCost;
    if (user.balance < 0) {
      user.balance = 0;
    }
    await user.save();

    const usageLog = new Usage({
      user: req.user.id,
      provider: provider._id,
      model: model._id,
      promptTokens: actualPromptTokens,
      completionTokens: actualCompletionTokens,
      cost: actualCost,
    });
    await usageLog.save();

    res.json({
      id: providerResponse.data?.id,
      object: providerResponse.data?.object,
      created: providerResponse.data?.created,
      model: model.name,
      provider: provider.name,
      response: responseContent,
      choices: Array.isArray(providerResponse.data?.choices)
        ? providerResponse.data.choices
        : [
            {
              index: 0,
              message: {
                role: 'assistant',
                content: responseContent,
              },
              finish_reason: 'stop',
            },
          ],
      usage: {
        prompt_tokens: actualPromptTokens,
        completion_tokens: actualCompletionTokens,
        total_tokens: actualPromptTokens + actualCompletionTokens,
        cost: actualCost,
      },
      userBalance: user.balance,
    });
  } catch (err) {
    console.error('Chat Completion Error:', err.message);
    if (err.response) {
      res.status(err.response.status).json({
        msg: `Provider error: ${err.response.data.error?.message || err.response.data.message || 'Unknown provider error'}`,
        providerError: err.response.data,
      });
    } else if (err.request) {
      res.status(503).json({ msg: 'Service Unavailable: No response from provider.' });
    } else {
      res.status(500).send('Server Error');
    }
  }
};