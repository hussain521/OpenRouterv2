import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'; // Import cors
import connectDB from './config/db.mjs'; // Import connectDB

connectDB();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// Mount Routers
app.use('/api/users', require('./routes/userRoutes.mjs'));
app.use('/api/providers', require('./routes/providerRoutes.mjs'));
app.use('/api/models', require('./routes/modelRoutes.mjs'));
app.use('/api/chat', require('./routes/chatRoutes.mjs'));
app.use('/api/usage', require('./routes/usageRoutes.mjs'));
app.use('/api/auth', require('./routes/authRoutes.mjs'));
app.use(cors()); // Use cors middleware
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Basic Route
app.get('/', (req, res) => {
  res.send('AI SaaS Backend is running!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});