import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import connectDB from './config/db.mjs'; // Assuming config/db.mjs also uses ES modules
import './config/passport.mjs'; // Import passport configuration
dotenv.config(); // Load environment variables from .env file

dotenv.config(); // Load environment variables from .env file

dotenv.config(); // Load environment variables from .env file

// Set MONGODB_URL if it's not already defined (e.g., if .env is not loaded correctly)
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/openrouter';

// Connect to MongoDB
connectDB();

const app = express();

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key', // Use a strong secret key from .env
  resave: false,
  saveUninitialized: false,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Define Routes
import authRoutes from './routes/authRoutes.mjs'; // Assuming routes also use ES modules
import userRoutes from './routes/userRoutes.mjs';
import authSocialRoutes from './routes/authSocialRoutes.mjs'; // New routes for social auth
import providerRoutes from './routes/providerRoutes.mjs';
import modelRoutes from './routes/modelRoutes.mjs';
import chatRoutes from './routes/chatRoutes.mjs';
import usageRoutes from './routes/usageRoutes.mjs';

// Mount Routes
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'none'; connect-src 'self' http://localhost:5000");
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth/social', authSocialRoutes); // Mount social auth routes
app.use('/api/providers', providerRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/usage', usageRoutes);

// Add a simple route for the root path to check backend status
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});