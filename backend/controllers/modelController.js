const Model = require('../models/Model');
const Provider = require('../models/Provider');

// Add a new model
exports.addModel = async (req, res) => {
    const { name, providerId, modelPricing } = req.body;

    try {
        const provider = await Provider.findById(providerId);
        if (!provider) {
            return res.status(404).json({ msg: 'Provider not found' });
        }

        let model = await Model.findOne({ name, provider: providerId });
        if (model) {
            return res.status(400).json({ msg: 'Model already exists for this provider' });
        }

        model = new Model({
            name,
            provider: providerId,
            modelPricing,
        });

        await model.save();
        provider.models.push(model._id);
        await provider.save();

        res.json(model);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all models
exports.getModels = async (req, res) => {
    try {
        const models = await Model.find().populate('provider');
        res.json(models);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete a model
exports.deleteModel = async (req, res) => {
    try {
        const model = await Model.findById(req.params.id);
        if (!model) {
            return res.status(404).json({ msg: 'Model not found' });
        }

        // Remove model from provider's model list
        const provider = await Provider.findById(model.provider);
        if (provider) {
            provider.models = provider.models.filter(
                (modelId) => modelId.toString() !== req.params.id
            );
            await provider.save();
        }

        await model.remove();
        res.json({ msg: 'Model removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};