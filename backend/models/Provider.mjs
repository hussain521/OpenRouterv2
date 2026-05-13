import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  baseUrl: {
    type: String,
    required: true,
    trim: true,
  },
  apiKey: {
    type: String,
    required: true,
  },
  models: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Model',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Provider', providerSchema);