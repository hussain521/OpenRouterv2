import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.mjs'; // Assuming config/db.mjs also uses ES modules

dotenv.config({ path: './.env' }); // Explicitly specify the path to the .env file

// Connect to MongoDB
// Hardcoding the MONGODB_URI for now to bypass .env loading issues
const hardcodedMongoUri = 'mongodb+srv://user:password@cluster.mongodb.net/your_database_name?retryWrites=true&w=majority';
process.env.MONGODB_URI = hardcodedMongoUri; // Temporarily override process.env
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Define Routes
import authRoutes from './routes/authRoutes.mjs'; // Assuming routes also use ES modules
import userRoutes from './routes/userRoutes.mjs';
import providerRoutes from './routes/providerRoutes.mjs';
import modelRoutes from './routes/modelRoutes.mjs';
import chatRoutes from './routes/chatRoutes.mjs';
import usageRoutes from './routes/usageRoutes.mjs';

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/usage', usageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});