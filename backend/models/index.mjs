import mongoose from 'mongoose';
import Model from './Model.mjs'; // Import Model from its dedicated file
import Provider from './Provider.mjs'; // Import Provider from its dedicated file

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // In a real app, use bcrypt for hashing
  balance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Usage Schema
const usageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
  model: { type: mongoose.Schema.Types.ObjectId, ref: 'Model', required: true },
  promptTokens: { type: Number, required: true },
  completionTokens: { type: Number, required: true },
  cost: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
const Usage = mongoose.model('Usage', usageSchema);

export { User, Provider, Usage, Model };