const Model = require('../models/Model');
const Provider = require('../models/Provider');
const User = require('../models/User');
const Usage = require('../models/Usage');
const axios = require('axios');

const createChatCompletion = async (req, res) => {
  const { model, messages } = req.body;
  const user = req.user;

  try {
    const modelInstance = await Model.findOne({ name: model }).populate('provider');
    if (!modelInstance) {
      return res.status(404).json({ message: 'Model not found' });
    }

    const provider = modelInstance.provider;
    if (provider.user.toString() !== user._id.toString()) {
      return res.status(401).json({ message: 'You are not authorized to use this model via this provider' });
    }

    // Placeholder for balance check
    if (user.balance <= 0) {
      return res.status(402).json({ message: 'Insufficient balance' });
    }

    const response = await axios.post(
      `${provider.baseURL}/chat/completions`,
      req.body,
      {
        headers: {
          'Authorization': `Bearer ${provider.apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const usageData = response.data.usage;
    const promptTokens = usageData.prompt_tokens;
    const completionTokens = usageData.completion_tokens;
    const totalTokens = usageData.total_tokens;

    const cost =
      (promptTokens / 1000) * modelInstance.pricingPer1kPrompt +
      (completionTokens / 1000) * modelInstance.pricingPer1kCompletion;

    user.balance -= cost;
    await user.save();

    await Usage.create({
      user: user._id,
      model: modelInstance._id,
      promptTokens,
      completionTokens,
      totalTokens,
      cost,
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while processing the chat completion.' });
  }
};

module.exports = { createChatCompletion };