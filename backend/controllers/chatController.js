const axios = require('axios');
const User = require('../models/User');
const Provider = require('../models/Provider');
const Model = require('../models/Model');
const Usage = require('../models/Usage');
const mongoose = require('mongoose');

// Helper function to count tokens (basic implementation, could be replaced with a more accurate library)
function countTokens(text) {
    return text.split(/\s+/).filter(Boolean).length;
}

// Helper function to get model pricing
async function getModelPricing(modelName) {
    // First, try to find the model directly.
    let model = await Model.findOne({ name: modelName }).populate('provider');
    if (model) {
        return model.modelPricing;
    }

    // If not found directly, try to find it by inferring provider from model name if possible
    // This is a simplification; a more robust solution might involve a mapping or a more complex search
    const modelParts = modelName.split('/'); // e.g., "openai/gpt-4"
    if (modelParts.length > 1) {
        const providerName = modelParts[0];
        const actualModelName = modelParts.slice(1).join('/');
        const provider = await Provider.findOne({ name: providerName });
        if (provider) {
            model = await Model.findOne({ name: actualModelName, provider: provider._id });
            if (model) {
                return model.modelPricing;
            }
        }
    }
    
    // Fallback to a default pricing if model or provider is not found or pricing is not defined
    console.warn(`Pricing not found for model: ${modelName}. Using default pricing.`);
    return {
        prompt: { input: 0.0001, output: 0.0001 }, // Example default pricing
        completion: { input: 0.0001, output: 0.0001 }
    };
}

exports.chatCompletion = async (req, res) => {
    const { model, messages } = req.body;
    const userId = req.user.id;

    if (!model || !messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ msg: 'Invalid request: model and messages are required.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found.' });
        }

        // Find the model and its provider
        let modelDoc = await Model.findOne({ name: model }).populate('provider');
        
        if (!modelDoc) {
            // Attempt to infer provider if model name is like 'providerName/modelName'
            const parts = model.split('/');
            if (parts.length === 2) {
                const providerName = parts[0];
                const modelNameOnly = parts[1];
                const provider = await Provider.findOne({ name: providerName });
                if (provider) {
                    modelDoc = await Model.findOne({ name: modelNameOnly, provider: provider._id }).populate('provider');
                }
            }
        }

        if (!modelDoc) {
            return res.status(404).json({ msg: `Model '${model}' not found or not configured.` });
        }

        const { provider, modelPricing } = modelDoc;
        
        // Calculate token counts
        let promptTokens = 0;
        let completionTokens = 0; // Typically, we don't know completion tokens in advance for chat
        
        for (const message of messages) {
            const tokens = countTokens(message.content);
            if (message.role === 'user' || message.role === 'system') {
                promptTokens += tokens;
            } else if (message.role === 'assistant') {
                completionTokens += tokens; // This is an approximation, actual completion tokens are after response
            }
        }
        
        // Recalculate prompt tokens based on actual message content provided by user
        promptTokens = messages.reduce((acc, msg) => acc + countTokens(msg.content), 0);


        // Calculate estimated cost for prompt tokens
        const promptCostPerToken = modelPricing?.prompt?.input || 0; // Default to 0 if not defined
        const estimatedPromptCost = promptTokens * promptCostPerToken;

        // Check if user has enough balance
        if (user.balance < estimatedPromptCost) {
            return res.status(402).json({ msg: 'Insufficient balance. Please deposit more credits.' });
        }

        // Prepare request for the provider
        const requestBody = {
            model: modelDoc.name, // Use the actual model name from the provider's perspective
            messages: messages,
            // Add any other parameters the provider expects, e.g., temperature, max_tokens
            // For now, we'll assume a basic structure and leave others to be expanded
        };

        // Make the request to the provider
        const providerResponse = await axios.post(`${provider.baseUrl}/v1/chat/completions`, requestBody, {
            headers: {
                'Authorization': `Bearer ${provider.apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        const { choices, usage: providerUsage } = providerResponse.data;
        const assistantMessage = choices[0]?.message;
        const actualCompletionTokens = providerUsage?.completion_tokens || countTokens(assistantMessage?.content || '');
        const actualPromptTokens = providerUsage?.prompt_tokens || promptTokens; // Use provider's token count if available

        const completionCostPerToken = modelPricing?.completion?.output || 0; // Default to 0
        const completionCost = actualCompletionTokens * completionCostPerToken;
        const totalCost = estimatedPromptCost + completionCost; // Prompt cost was already deducted or will be fully deducted here

        // Deduct total cost from user balance
        const newBalance = user.balance - totalCost;
        if (newBalance < 0) {
            // This should ideally not happen if the initial check was accurate, but as a safeguard:
            console.warn(`Cost calculation resulted in negative balance for user ${userId}. Adjusting balance to 0.`);
            user.balance = 0;
        } else {
            user.balance = newBalance;
        }
        await user.save();

        // Store usage log
        const usage = new Usage({
            user: userId,
            model: modelDoc._id,
            provider: provider._id,
            promptTokens: actualPromptTokens,
            completionTokens: actualCompletionTokens,
            totalTokens: actualPromptTokens + actualCompletionTokens,
            cost: totalCost,
        });
        await usage.save();

        // Return the response from the provider
        res.json({
            id: providerResponse.data.id,
            object: providerResponse.data.object,
            created: providerResponse.data.created,
            model: modelDoc.name, // Return our internal model name
            choices: [{
                index: 0,
                message: assistantMessage,
                finish_reason: choices[0]?.finish_reason || 'stop' // Use provider's finish_reason if available
            }],
            usage: {
                prompt_tokens: actualPromptTokens,
                completion_tokens: actualCompletionTokens,
                total_tokens: actualPromptTokens + actualCompletionTokens,
            },
            user_balance: user.balance // Include updated balance
        });

    } catch (err) {
        console.error('Chat completion error:', err.message);
        if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Provider API error data:', err.response.data);
            console.error('Provider API error status:', err.response.status);
            console.error('Provider API error headers:', err.response.headers);
            res.status(err.response.status).json({
                msg: 'Error communicating with provider API.',
                providerMessage: err.response.data.message || err.response.data.error?.message || 'Unknown provider error',
                providerStatus: err.response.status
            });
        } else if (err.request) {
            // The request was made but no response was received
            console.error('Provider API request error:', err.request);
            res.status(500).json({ msg: 'No response received from provider API.' });
        } else {
            // Something happened in setting up the request that triggered an Error
            res.status(500).send('Server error during request setup.');
        }
    }
};

// Placeholder for completion endpoint if it differs from chat
// exports.completion = async (req, res) => {
//     // Implementation similar to chatCompletion but for older completion API style
//     // May need different request/response structure
// };
