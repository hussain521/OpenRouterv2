const User = require('../models/User');
const Usage = require('../models/Usage');

const getUserBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({ balance: user.balance });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserUsage = async (req, res) => {
  try {
    const usage = await Usage.find({ user: req.user._id }).populate('model', 'name');
    res.json(usage);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserBalance, getUserUsage };