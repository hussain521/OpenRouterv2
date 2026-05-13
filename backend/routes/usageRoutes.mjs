import express from 'express';
import { getUsageLogs } from '../controllers/usageController.mjs';
import authMiddleware from '../middleware/authMiddleware.mjs';

const router = express.Router();

// @route   GET /api/usage
// @desc    Get all usage logs for the authenticated user
// @access  Private
router.get('/', authMiddleware, getUsageLogs);

export default router;