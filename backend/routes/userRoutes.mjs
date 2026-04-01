import express from 'express';
import { getUserBalance, depositBalance } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.mjs'; // Assuming this will be created

const router = express.Router();

// Protect these routes with authentication
router.get('/balance', authenticateToken, getUserBalance);
router.post('/deposit', authenticateToken, depositBalance);

export default router;