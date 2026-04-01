import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

// Basic Route
app.get('/', (req, res) => {
  res.send('AI SaaS Backend Running');
});

// TODO: Import and use routes here

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});