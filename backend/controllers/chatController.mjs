import { User, Provider, Model, Usage } from '../models/index.mjs';
import axios from 'axios';

// Helper function to get token counts (this is a placeholder and needs a proper implementation)
// In a real-world scenario, you'd use a library or a more sophisticated method
// to count tokens based on the specific model's tokenizer.
const getTokenCount = (text) => {
  // Simple word count as a placeholder
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
  const { model: modelName, messages, stream = false } = req.body; // Added stream option

  if (!modelName || !messages) {
    return res.status(400).json({ msg: 'Model and messages are required' });
  }

  try {
    // 1. Find the model and its provider
    const model = await Model.findOne({ name: modelName }).populate('provider');
    if (!model) {
      return res.status(404).json({ msg: 'Model not found' });
    }

    const provider = model.provider;
    if (!provider) {
      return res.status(404).json({ msg: 'Provider not found for the model' });
    }

    // 2. Check user balance
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // --- Placeholder for token estimation and cost calculation ---
    // In a real application, you'd need to estimate tokens for the prompt
    // and potentially the completion to check balance *before* sending the request.
    // For simplicity here, we'll estimate tokens and calculate cost after the response.
    // A more robust solution would involve a token estimation library or API call.

    let estimatedPromptTokens = 0;
    messages.forEach(msg => {
      estimatedPromptTokens += getTokenCount(msg.content);
    });
    // Assume completion will have a similar number of tokens for estimation purposes
    const estimatedCompletionTokens = estimatedPromptTokens; // This is a very rough estimate
    const estimatedTotalTokens = estimatedPromptTokens + estimatedCompletionTokens;
    const estimatedCost = calculateCost(model.pricing, estimatedTotalTokens, estimatedTotalTokens); // Using estimated completion tokens as well

    if (user.balance < estimatedCost) {
      return res.status(400).json({ msg: 'Insufficient balance' });
    }
    // --- End of token estimation placeholder ---

    // 3. Prepare request for the provider
    const providerRequestUrl = `${provider.baseUrl}/v1/chat/completions`; // Assuming OpenAI compatible endpoint
    const providerRequestBody = {
      model: modelName, // Use the model name as provided by the user
      messages: messages,
      stream: stream, // Pass the stream option
      // Add any other parameters the provider might need, e.g., temperature, max_tokens
    };

    // 4. Send request to the provider
    const providerResponse = await axios.post(providerRequestUrl, providerRequestBody, {
      headers: {
        'Authorization': `Bearer ${provider.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    // 5. Process the response and calculate actual usage
    let responseContent = '';
    let actualPromptTokens = 0;
    let actualCompletionTokens = 0;

    if (stream) {
      // Handle streaming response - this is complex and requires careful implementation
      // For now, we'll just acknowledge it and return a placeholder.
      // A full streaming implementation would involve piping the response.
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      // Placeholder for streaming logic - this needs to be fully implemented
      // to correctly capture tokens and costs from a stream.
      // For now, we'll just send a message and close the stream.
      res.write('event: message\n');
      res.write('data: {"message": "Streaming is not fully implemented yet. Please check logs for details."}\n\n');
      res.end();
      return; // Exit after sending stream message
    } else {
      // Non-streaming response
      if (providerResponse.data && providerResponse.data.choices && providerResponse.data.choices.length > 0) {
        responseContent = providerResponse.data.choices[0].message.content;
        // Attempt to get token usage from provider's response if available (OpenAI format)
        actualPromptTokens = providerResponse.data.usage?.prompt_tokens || getTokenCount(messages.map(m => m.content).join('\n'));
        actualCompletionTokens = providerResponse.data.usage?.completion_tokens || getTokenCount(responseContent);
      } else {
        // Fallback if response structure is unexpected
        actualPromptTokens = estimatedPromptTokens;
        actualCompletionTokens = estimatedCompletionTokens;
      }
    }

    const actualCost = calculateCost(model.pricing, actualPromptTokens, actualCompletionTokens);

    // 6. Deduct cost from user balance
    user.balance -= actualCost;
    if (user.balance < 0) {
      user.balance = 0; // Ensure balance doesn't go negative
    }
    await user.save();

    // 7. Store usage log
    const usageLog = new Usage({
      user: req.user.id,
      provider: provider._id,
      model: model._id,
      promptTokens: actualPromptTokens,
      completionTokens: actualCompletionTokens,
      cost: actualCost,
    });
    await usageLog.save();

    // 8. Return the response to the client
    res.json({
      model: modelName,
      provider: provider.name,
      response: responseContent,
      usage: {
        promptTokens: actualPromptTokens,
        completionTokens: actualCompletionTokens,
        cost: actualCost,
      },
      userBalance: user.balance,
    });

  } catch (err) {
    console.error('Chat Completion Error:', err.message);
    // Attempt to send a more specific error message if possible
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      res.status(err.response.status).json({
        msg: `Provider error: ${err.response.data.error?.message || err.response.data.message || 'Unknown provider error'}`,
        providerError: err.response.data,
      });
    } else if (err.request) {
      // The request was made but no response was received
      res.status(503).json({ msg: 'Service Unavailable: No response from provider.' });
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(500).send('Server Error');
    }
  }
};