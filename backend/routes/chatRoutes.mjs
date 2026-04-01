import express from 'express';
import { chatCompletion } from '../controllers/chatController.mjs'; // Updated path
import { authenticateToken } from '../middleware/authMiddleware.mjs'; // Updated path

const router = express.Router();

// Protect this route with authentication
router.post('/completions', authenticateToken, chatCompletion);

export default router;