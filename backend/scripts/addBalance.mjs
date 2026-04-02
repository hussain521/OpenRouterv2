import mongoose from 'mongoose';
import { User } from '../models/index.mjs';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected successfully.');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const addBalanceToUser = async (email, amount) => {
  await connectDB();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.error(`User with email ${email} not found.`);
      return;
    }

    user.balance += amount;
    await user.save();

    console.log(`Successfully added ${amount} to user ${email}. New balance: ${user.balance}`);
  } catch (error) {
    console.error('Error adding balance:', error.message);
  } finally {
    mongoose.disconnect();
  }
};

// Example usage:
// node backend/scripts/addBalance.mjs user@example.com 100
const args = process.argv.slice(2);
if (args.length !== 2) {
  console.log('Usage: node backend/scripts/addBalance.mjs <user_email> <amount>');
  process.exit(1);
}

const [email, amountStr] = args;
const amount = parseFloat(amountStr);

if (isNaN(amount) || amount <= 0) {
  console.log('Amount must be a positive number.');
  process.exit(1);
}

addBalanceToUser(email, amount);