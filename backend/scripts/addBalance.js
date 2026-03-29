const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const connectDB = require('../config/db');

dotenv.config({ path: __dirname + '/../.env' });

connectDB();

const addBalance = async (email, amount) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found');
      process.exit(1);
    }

    user.balance += parseFloat(amount);
    await user.save();

    console.log(`Successfully added ${amount} to ${email}'s balance.`);
    console.log(`New balance is: ${user.balance}`);
    process.exit(0);
  } catch (error) {
    console.error('Error adding balance:', error);
    process.exit(1);
  }
};

const email = process.argv[2];
const amount = process.argv[3];

if (!email || !amount) {
  console.log('Please provide an email and an amount.');
  console.log('Usage: node addBalance.js <email> <amount>');
  process.exit(1);
}

addBalance(email, amount);