import { Usage, Provider, Model } from '../models/index.mjs';

// @desc    Get all usage logs for the authenticated user
// @route   GET /api/usage
// @access  Private
export const getUsageLogs = async (req, res) => {
  try {
    const usageLogs = await Usage.find({ user: req.user.id })
      .populate('provider', 'name')
      .populate('model', 'name')
      .sort({ timestamp: -1 }); // Sort by timestamp descending

    res.json(usageLogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};