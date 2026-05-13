const User = require('../models/User');

// Get user balance
exports.getUserBalance = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('balance');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Deposit balance
exports.depositBalance = async (req, res) => {
    const { amount } = req.body;

    if (!amount || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ msg: 'Invalid amount' });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.balance += amount;
        await user.save();

        res.json({ msg: 'Balance deposited successfully', balance: user.balance });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};