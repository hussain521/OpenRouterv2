import express from 'express';
import { chatCompletion } from '../controllers/chatController.mjs';
import authMiddleware from '../middleware/authMiddleware.mjs';

const router = express.Router();

// @route   POST /api/chat/completions
// @desc    Send chat completion request to a provider
// @access  Private
router.post('/completions', authMiddleware, chatCompletion);

export default router;