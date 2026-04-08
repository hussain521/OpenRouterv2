import { User, Usage } from '../models/index.mjs';

// @desc    Get user balance
// @route   GET /api/users/balance
// @access  Private
export const getUserBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('balance');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Deposit balance to user account
// @route   POST /api/users/deposit
// @access  Private
export const depositBalance = async (req, res) => {
  const { amount } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ msg: 'Invalid deposit amount' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.balance += parseFloat(amount);
    await user.save();

    res.json({ msg: 'Balance deposited successfully', balance: user.balance });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get user usage logs
// @route   GET /api/users/usage
// @access  Private
export const getUsageLogs = async (req, res) => {
  try {
    const usageLogs = await Usage.find({ user: req.user.id }).populate('provider', 'name').populate('model', 'name');
    res.json(usageLogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};