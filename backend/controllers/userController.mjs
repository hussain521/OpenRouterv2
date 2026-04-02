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