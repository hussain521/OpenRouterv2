import express from 'express';
import { getUserBalance, getUsageLogs } from '../controllers/userController.mjs';
import authMiddleware from '../middleware/authMiddleware.mjs';

const router = express.Router();

// @route   GET /api/users/balance
// @desc    Get user balance
// @access  Private
router.get('/balance', authMiddleware, getUserBalance);

// @route   GET /api/users/usage
// @desc    Get user usage logs
// @access  Private
router.get('/usage', authMiddleware, getUsageLogs);

export default router;