import express from 'express';
import { syncModels } from '../controllers/modelController.mjs';
import { authenticateToken } from '../middleware/authMiddleware.mjs';

const router = express.Router();

// Protect this route with authentication
router.post('/sync', authenticateToken, syncModels);

export default router;