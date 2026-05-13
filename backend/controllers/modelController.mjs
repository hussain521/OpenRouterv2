import { Provider, Model } from '../models/index.mjs';
import axios from 'axios';

// @desc    Add a new model
// @route   POST /api/models
// @access  Private
export const addModel = async (req, res) => {
  const { providerId, name, pricing } = req.body;

  try {
    // Check if provider exists
    const provider = await Provider.findById(providerId);
    if (!provider) {
      return res.status(404).json({ msg: 'Provider not found' });
    }

    // Check if model already exists for this provider
    let model = await Model.findOne({ provider: providerId, name });
    if (model) {
      return res.status(400).json({ msg: 'Model already exists for this provider' });
    }

    // Create new model
    model = new Model({
      provider: providerId,
      name,
      pricing,
    });

    await model.save();

    // Add model to provider's models array
    provider.models.push(model._id);
    await provider.save();

    res.json(model);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all models
// @route   GET /api/models
// @access  Private
export const getModels = async (req, res) => {
  try {
    const models = await Model.find().populate('provider', 'name'); // Populate with provider name
    res.json(models);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a model
// @route   DELETE /api/models/:id
// @access  Private
export const deleteModel = async (req, res) => {
  try {
    const model = await Model.findById(req.params.id);

    if (!model) {
      return res.status(404).json({ msg: 'Model not found' });
    }

    // Remove model from provider's models array
    const provider = await Provider.findById(model.provider);
    if (provider) {
      provider.models = provider.models.filter(
        (modelId) => modelId.toString() !== req.params.id
      );
      await provider.save();
    }

    await Model.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Model removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Sync models from a provider
// @route   POST /api/models/sync/:providerId
// @access  Private
export const syncModels = async (req, res) => {
  const { providerId } = req.params;

  try {
    const provider = await Provider.findById(providerId);
    if (!provider) {
      return res.status(404).json({ msg: 'Provider not found' });
    }

    // --- Placeholder for actual provider API call ---
    // This is where you would make an API call to the provider's endpoint
    // to fetch their available models. The exact implementation will depend
    // on each provider's API.
    // For now, we'll simulate a response.

    let fetchedModels = [];
    if (provider.name.toLowerCase().includes('openai')) {
      // Example for OpenAI (replace with actual API call)
      fetchedModels = [
        { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', pricing: { prompt: 0.0000015, completion: 0.000002 } },
        { id: 'gpt-4', name: 'GPT-4', pricing: { prompt: 0.00003, completion: 0.00006 } },
      ];
    } else if (provider.name.toLowerCase().includes('claude')) {
      // Example for Claude (replace with actual API call)
      fetchedModels = [
        { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus', pricing: { prompt: 0.000015, completion: 0.000075 } },
        { id: 'claude-3-sonnet-20240229', name: 'Claude 3 Sonnet', pricing: { prompt: 0.000003, completion: 0.000015 } },
      ];
    } else if (provider.name.toLowerCase().includes('gemini')) {
      // Example for Gemini (replace with actual API call)
      fetchedModels = [
        { id: 'gemini-1.0-pro', name: 'Gemini 1.0 Pro', pricing: { prompt: 0.0000005, completion: 0.0000005 } },
        { id: 'gemini-1.5-pro-latest', name: 'Gemini 1.5 Pro', pricing: { prompt: 0.0000035, completion: 0.000007 } },
      ];
    }
    // Add more providers as needed...

    const syncedModelIds = [];
    for (const fetchedModel of fetchedModels) {
      let model = await Model.findOne({ provider: providerId, name: fetchedModel.id });
      if (!model) {
        model = new Model({
          provider: providerId,
          name: fetchedModel.id, // Use the provider's ID as the model name for consistency
          pricing: fetchedModel.pricing,
        });
        await model.save();
        syncedModelIds.push(model._id);
      } else {
        // Update pricing if it has changed
        model.pricing = fetchedModel.pricing;
        await model.save();
        syncedModelIds.push(model._id);
      }
    }

    // Update provider's models array to only include synced models
    provider.models = syncedModelIds;
    await provider.save();

    res.json({ msg: 'Models synced successfully', syncedModels: syncedModelIds });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};