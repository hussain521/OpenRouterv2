import { Provider, Model } from '../models/index.mjs';

// @desc    Add a new provider
// @route   POST /api/providers
// @access  Private
export const addProvider = async (req, res) => {
  const { name, baseUrl, apiKey } = req.body;

  try {
    // Check if provider already exists
    let provider = await Provider.findOne({ name });
    if (provider) {
      return res.status(400).json({ msg: 'Provider already exists' });
    }

    // Create new provider
    provider = new Provider({
      name,
      baseUrl,
      apiKey,
    });

    await provider.save();
    res.json(provider);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all providers
// @route   GET /api/providers
// @access  Private
export const getProviders = async (req, res) => {
  try {
    const providers = await Provider.find().populate('models', 'name'); // Populate with model names
    res.json(providers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a provider
// @route   DELETE /api/providers/:id
// @access  Private
export const deleteProvider = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);

    if (!provider) {
      return res.status(404).json({ msg: 'Provider not found' });
    }

    // Before deleting the provider, we should also delete associated models
    await Model.deleteMany({ provider: req.params.id });

    await Provider.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Provider removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};