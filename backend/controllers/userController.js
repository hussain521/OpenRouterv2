import { User } from '../models/index.mjs';

// Get User Balance
export const getUserBalance = async (req, res) => {
  try {
    // req.user is populated by the authenticateToken middleware
    const user = await User.findById(req.user.id).select('balance');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ balance: user.balance });
  } catch (error) {
    console.error('Error fetching user balance:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Deposit Balance
export const depositBalance = async (req, res) => {
  const { amount } = req.body;

  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ message: 'Invalid deposit amount' });
  }

  try {
    // req.user is populated by the authenticateToken middleware
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.balance += amount;
    await user.save();

    res.status(200).json({ message: 'Deposit successful', balance: user.balance });
  } catch (error) {
    console.error('Error depositing balance:', error);
    res.status(500).json({ message: 'Server error' });
  }
};