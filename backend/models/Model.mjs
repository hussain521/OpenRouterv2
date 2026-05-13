import mongoose from 'mongoose';

const modelSchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  pricing: {
    type: Object, // e.g., { prompt: 0.0001, completion: 0.0002 }
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Model', modelSchema);