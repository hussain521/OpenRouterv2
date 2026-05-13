const Usage = require('../models/Usage');
const mongoose = require('mongoose');

// Get usage logs for the authenticated user
exports.getUsageLogs = async (req, res) => {
    try {
        const userId = req.user.id;
        const logs = await Usage.find({ user: userId })
            .populate('model', 'name')
            .populate('provider', 'name')
            .sort({ timestamp: -1 }); // Sort by newest first

        res.json(logs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};