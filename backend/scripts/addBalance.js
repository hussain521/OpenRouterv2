const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const addBalanceToUser = async (userId, amount) => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const user = await User.findById(userId);

        if (!user) {
            console.error('User not found.');
            return;
        }

        user.balance += amount;
        await user.save();

        console.log(`Successfully added ${amount} to user ${userId}. New balance: ${user.balance}`);
    } catch (err) {
        console.error('Error adding balance:', err);
    } finally {
        mongoose.disconnect();
    }
};

// Example usage:
// To run this script: node backend/scripts/addBalance.js <userId> <amount>
// e.g., node backend/scripts/addBalance.js 65a7b2d5a7c8a5a3a7d9f0e1 100

const args = process.argv.slice(2);
if (args.length !== 2) {
    console.log('Usage: node backend/scripts/addBalance.js <userId> <amount>');
    process.exit(1);
}

const [userId, amount] = args;
addBalanceToUser(userId, parseFloat(amount));