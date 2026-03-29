const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Provider',
  },
  name: {
    type: String,
    required: true,
  },
  pricingPer1kPrompt: {
    type: Number,
    required: true,
  },
  pricingPer1kCompletion: {
    type: Number,
    required: true,
  },
  contextLength: {
    type: Number,
  },
}, {
  timestamps: true,
});

const Model = mongoose.model('Model', ModelSchema);

module.exports = Model;