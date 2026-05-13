const Provider = require('../models/Provider');
const Model = require('../models/Model');
const axios = require('axios');

// Add a new provider
exports.addProvider = async (req, res) => {
    const { name, baseUrl, apiKey } = req.body;

    try {
        let provider = await Provider.findOne({ name });
        if (provider) {
            return res.status(400).json({ msg: 'Provider already exists' });
        }

        provider = new Provider({
            name,
            baseUrl,
            apiKey,
        });

        await provider.save();
        res.json(provider);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all providers
exports.getProviders = async (req, res) => {
    try {
        const providers = await Provider.find().populate('models');
        res.json(providers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete a provider
exports.deleteProvider = async (req, res) => {
    try {
        const provider = await Provider.findById(req.params.id);
        if (!provider) {
            return res.status(404).json({ msg: 'Provider not found' });
        }

        // Remove associated models
        await Model.deleteMany({ provider: req.params.id });

        await provider.remove();
        res.json({ msg: 'Provider removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Sync models from a provider
exports.syncModels = async (req, res) => {
    try {
        const provider = await Provider.findById(req.params.id);
        if (!provider) {
            return res.status(404).json({ msg: 'Provider not found' });
        }

        // Example: Make a request to the provider's API to get models
        // This part is highly dependent on the provider's API structure
        // For demonstration, we'll assume a /models endpoint that returns a list of model objects
        const response = await axios.get(`${provider.baseUrl}/v1/models`, {
            headers: {
                'Authorization': `Bearer ${provider.apiKey}`
            }
        });

        const providerModels = response.data.data; // Assuming the response contains a 'data' array of models

        // Clear existing models for this provider before syncing new ones
        await Model.deleteMany({ provider: provider._id });

        for (const modelData of providerModels) {
            const newModel = new Model({
                name: modelData.id, // Assuming modelData has an 'id' field for the model name
                provider: provider._id,
                modelPricing: { // Placeholder - pricing needs to be fetched or configured
                    prompt: { input: 0.0001, output: 0.0001 },
                    completion: { input: 0.0001, output: 0.0001 },
                },
            });
            await newModel.save();
            provider.models.push(newModel._id);
        }

        await provider.save();
        res.json(provider);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};