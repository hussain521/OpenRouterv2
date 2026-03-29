const Model = require('../models/Model');
const Provider = require('../models/Provider');
const axios = require('axios');

const getModels = async (req, res) => {
  try {
    const models = await Model.find({ provider: req.params.providerId });
    res.json(models);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const syncModels = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.providerId);

    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    if (provider.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const response = await axios.get(`${provider.baseURL}/models`, {
      headers: {
        'Authorization': `Bearer ${provider.apiKey}`,
      },
    });

    const modelsFromProvider = response.data.data;

    for (const modelData of modelsFromProvider) {
      await Model.findOneAndUpdate(
        { name: modelData.id, provider: provider._id },
        {
          name: modelData.id,
          provider: provider._id,
          // These are placeholders, actual pricing would need to be mapped
          pricingPer1kPrompt: 0.5,
          pricingPer1kCompletion: 1.5,
          contextLength: modelData.context_window || 8192,
        },
        { upsert: true, new: true }
      );
    }

    res.json({ message: 'Models synced successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to sync models from provider' });
  }
};

module.exports = { getModels, syncModels };