import { User, Provider, Model, Usage } from '../models/index.mjs';
import axios from 'axios';
import jwt from 'jsonwebtoken'; // Needed for token verification if not already handled by middleware

// Helper function to get token count (placeholder, needs actual implementation)
const getTokenCount = async (text, modelName) => {
  // In a real application, you would use a library like 'tiktoken' or an API
  // to accurately count tokens based on the model.
  // For now, we'll use a simple character count as a rough estimate.
  console.warn('Using a placeholder for token counting. Implement actual token counting logic.');
  return text.length / 4; // Very rough estimate
};

// Helper function to calculate cost
const calculateCost = (promptTokens, completionTokens, pricing) => {
  const promptCost = (pricing.prompt || 0) * promptTokens;
  const completionCost = (pricing.completion || 0) * completionTokens;
  return promptCost + completionCost;
};

export const chatCompletion = async (req, res) => {
  const { model: modelName, messages, stream = false } = req.body; // Expecting OpenAI-compatible request body

  if (!modelName || !messages || !Array.isArray(messages)) {
    return res.status(400).json({ message: 'Invalid request body. Missing model, messages, or messages is not an array.' });
  }

  try {
    // 1. Find the model and its provider
    const model = await Model.findOne({ name: modelName }).populate('provider');
    if (!model) {
      return res.status(404).json({ message: `Model '${modelName}' not found.` });
    }

    const provider = model.provider;
    if (!provider) {
      return res.status(404).json({ message: `Provider for model '${modelName}' not found.` });
    }

    // 2. Check user balance
    // req.user is populated by the authenticateToken middleware
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // 3. Prepare request for the provider API
    const providerRequestUrl = `${provider.baseUrl}/v1/chat/completions`; // Assuming OpenAI compatible endpoint

    // Estimate token usage for prompt (messages)
    let promptTokens = 0;
    for (const message of messages) {
      promptTokens += await getTokenCount(message.content, modelName);
    }

    // Calculate estimated cost
    const pricing = model.pricing || {}; // Use pricing from the model, or empty object if not available
    const estimatedCost = calculateCost(promptTokens, 0, pricing); // Initially estimate cost based on prompt tokens

    // 4. Check if user has enough balance
    if (user.balance < estimatedCost) {
      return res.status(402).json({ message: 'Insufficient balance. Please deposit more funds.' });
    }

    // 5. Make the request to the provider
    let providerResponse;
    try {
      providerResponse = await axios.post(providerRequestUrl, {
        model: modelName, // Send the actual model name to the provider
        messages: messages,
        stream: stream, // Pass stream option along
      }, {
        headers: {
          'Authorization': `Bearer ${provider.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error calling provider API:', error.response ? error.response.data : error.message);
      // Attempt to deduct cost even if provider fails, or handle based on policy
      // For now, we'll just return the error.
      return res.status(error.response?.status || 500).json({ message: 'Error communicating with the AI provider.', details: error.response?.data });
    }

    // 6. Process provider response and calculate final token/cost
    let completionTokens = 0;
    let finalCost = estimatedCost; // Start with estimated cost

    if (stream) {
      // Handling streaming responses is more complex.
      // For now, we'll acknowledge it but might not fully implement streaming logic here.
      // A proper implementation would involve piping the response stream.
      console.warn('Streaming is enabled but not fully implemented in this proxy.');
      // You would need to process chunks, count completion tokens from chunks, and update balance/usage.
      // For simplicity, we'll return the first chunk or a message indicating streaming.
      // A more robust solution would involve setting up SSE on the backend.
      // For now, let's assume we get a final response structure even if streaming is requested.
      // If the provider truly streams, this part needs significant rework.
      // For this example, we'll assume the response object contains the final completion details if not streaming.
      // If streaming is true, providerResponse.data might be a stream.
      // We'll need to parse it to get completion tokens and content.
      // This is a complex part and might require a different approach for streaming.
      // For now, we'll focus on the non-streaming case.
    } else {
      // Non-streaming response
      const completion = providerResponse.data.choices?.[0]?.message?.content;
      if (completion) {
        completionTokens = await getTokenCount(completion, modelName);
        finalCost = calculateCost(promptTokens, completionTokens, pricing);
      } else {
        console.warn('No completion content found in provider response.');
      }
    }

    // 7. Deduct cost from user balance
    if (user.balance < finalCost) {
      // This check is important in case the estimated cost was wrong or completion tokens are high
      return res.status(402).json({ message: 'Insufficient balance after calculation. Please deposit more funds.' });
    }
    user.balance -= finalCost;
    await user.save();

    // 8. Store usage log
    const newUsage = new Usage({
      userId: user._id,
      provider: provider._id,
      model: model._id,
      promptTokens: promptTokens,
      completionTokens: completionTokens,
      cost: finalCost,
    });
    await newUsage.save();

    // 9. Return the provider's response
    // Modify the response to be OpenAI compatible if necessary, or just pass it through.
    // For now, we'll pass through the core data.
    res.status(200).json({
      id: `chatcmpl-${Date.now()}`, // Example OpenAI-compatible ID
      object: 'chat.completion',
      created: Math.floor(Date.now() / 1000),
      model: modelName, // Use the requested model name
      choices: [{
        message: {
          role: 'assistant',
          content: providerResponse.data.choices?.[0]?.message?.content || 'No content received.',
        },
        finish_reason: providerResponse.data.choices?.[0]?.finish_reason || 'stop',
      }],
      usage: {
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: promptTokens + completionTokens,
      },
      // You might want to include provider-specific details or metadata here if needed
    });

  } catch (error) {
    console.error('Error in chat completion:', error);
    res.status(500).json({ message: 'Server error during chat completion.' });
  }
};