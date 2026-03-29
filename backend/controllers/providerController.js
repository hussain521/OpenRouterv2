const Provider = require('../models/Provider');

const addProvider = async (req, res) => {
  const { name, apiKey, baseURL } = req.body;

  try {
    const provider = new Provider({
      user: req.user._id,
      name,
      apiKey,
      baseURL,
    });

    const createdProvider = await provider.save();
    res.status(201).json(createdProvider);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getProviders = async (req, res) => {
  try {
    const providers = await Provider.find({ user: req.user._id });
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteProvider = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);

    if (provider) {
      if (provider.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }
      await provider.remove();
      res.json({ message: 'Provider removed' });
    } else {
      res.status(404).json({ message: 'Provider not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addProvider, getProviders, deleteProvider };