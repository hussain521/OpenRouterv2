import express from 'express';
import {
  addModel,
  getModels,
  deleteModel,
  syncModels,
} from '../controllers/modelController.mjs';
import authMiddleware from '../middleware/authMiddleware.mjs';

const router = express.Router();

// @route   POST /api/models
// @desc    Add a new model
// @access  Private
router.post('/', authMiddleware, addModel);

// @route   GET /api/models
// @desc    Get all models
// @access  Private
router.get('/', authMiddleware, getModels);

// @route   DELETE /api/models/:id
// @desc    Delete a model
// @access  Private
router.delete('/:id', authMiddleware, deleteModel);

// @route   POST /api/models/sync/:providerId
// @desc    Sync models from a provider
// @access  Private
router.post('/sync/:providerId', authMiddleware, syncModels);

export default router;