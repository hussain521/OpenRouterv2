import mongoose from 'mongoose';

const ProviderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  apiKey: {
    type: String,
    required: true,
  },
  baseURL: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Provider = mongoose.model('Provider', ProviderSchema);

export default Provider;