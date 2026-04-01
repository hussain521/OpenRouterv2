import { Model } from '../models/index.mjs';
import Provider from '../models/Provider.mjs';

// Add a new provider
export const addProvider = async (req, res) => {
  const { name, baseUrl, apiKey } = req.body;

  if (!name || !baseUrl || !apiKey) {
    return res.status(400).json({ message: 'Please provide name, baseUrl, and apiKey' });
  }

  try {
    const existingProvider = await Provider.findOne({ name });
    if (existingProvider) {
      return res.status(400).json({ message: 'Provider with this name already exists' });
    }

    const newProvider = new Provider({
      name,
      baseUrl,
      apiKey,
    });

    await newProvider.save();
    res.status(201).json({ message: 'Provider added successfully', provider: newProvider });
  } catch (error) {
    console.error('Error adding provider:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// List all providers
export const listProviders = async (req, res) => {
  try {
    const providers = await Provider.find().populate('models', 'name'); // Populate with model names
    res.status(200).json(providers);
  } catch (error) {
    console.error('Error listing providers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a provider by ID
export const deleteProvider = async (req, res) => {
  const { id } = req.params;

  try {
    const provider = await Provider.findById(id);
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    // Before deleting the provider, we should also consider deleting associated models
    // and potentially usage logs, or at least disassociating them.
    // For simplicity here, we'll just remove the provider.
    // In a real-world scenario, you'd want a more robust cleanup strategy.
    await Model.deleteMany({ provider: id }); // Remove associated models
    await provider.deleteOne(); // Use deleteOne() for Mongoose v6+

    res.status(200).json({ message: 'Provider deleted successfully' });
  } catch (error) {
    console.error('Error deleting provider:', error);
    res.status(500).json({ message: 'Server error' });
  }
};