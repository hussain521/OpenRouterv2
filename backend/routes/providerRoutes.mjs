import express from 'express';
import {
  addProvider,
  getProviders,
  deleteProvider,
} from '../controllers/providerController.mjs';
import authMiddleware from '../middleware/authMiddleware.mjs';

const router = express.Router();

// @route   POST /api/providers
// @desc    Add a new provider
// @access  Private
router.post('/', authMiddleware, addProvider);

// @route   GET /api/providers
// @desc    Get all providers
// @access  Private
router.get('/', authMiddleware, getProviders);

// @route   DELETE /api/providers/:id
// @desc    Delete a provider
// @access  Private
router.delete('/:id', authMiddleware, deleteProvider);

export default router;