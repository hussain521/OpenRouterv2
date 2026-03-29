const mongoose = require('mongoose');

const UsageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  model: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Model',
  },
  promptTokens: {
    type: Number,
    required: true,
  },
  completionTokens: {
    type: Number,
    required: true,
  },
  totalTokens: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const Usage = mongoose.model('Usage', UsageSchema);

module.exports = Usage;