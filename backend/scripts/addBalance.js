import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/index.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for script.');
  } catch (error) {
    console.error('Error connecting to MongoDB for script:', error.message);
    process.exit(1);
  }
};

const addBalanceToUser = async (username, amount) => {
  if (!username || !amount || typeof amount !== 'number' || amount <= 0) {
    console.error('Invalid input: Please provide a valid username and a positive numeric amount.');
    return;
  }

  try {
    await connectDB();

    const user = await User.findOne({ username });
    if (!user) {
      console.error(`User with username "${username}" not found.`);
      return;
    }

    user.balance += amount;
    await user.save();

    console.log(`Successfully added ${amount} to user "${username}". New balance: ${user.balance}`);
  } catch (error) {
    console.error(`Error adding balance to user "${username}":`, error);
  } finally {
    mongoose.disconnect(); // Disconnect after operation
  }
};

// Example usage:
// node backend/scripts/addBalance.js JohnDoe 100
const args = process.argv.slice(2); // Get command line arguments
const username = args[0];
const amount = parseFloat(args[1]);

if (username && !isNaN(amount)) {
  addBalanceToUser(username, amount);
} else {
  console.log('Usage: node backend/scripts/addBalance.js <username> <amount>');
}