import express from 'express';
import { addProvider, listProviders, deleteProvider } from '../controllers/providerController.mjs';
import { authenticateToken } from '../middleware/authMiddleware.mjs';

const router = express.Router();

// Protect these routes with authentication
router.post('/add', authenticateToken, addProvider);
router.get('/list', authenticateToken, listProviders);
router.delete('/delete/:id', authenticateToken, deleteProvider);

export default router;