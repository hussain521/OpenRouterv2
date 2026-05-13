const express = require('express');
const router = express.Router();
const {
    addProvider,
    getProviders,
    deleteProvider,
    syncModels
} = require('../controllers/providerController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addProvider);
router.get('/', authMiddleware, getProviders);
router.delete('/:id', authMiddleware, deleteProvider);
router.post('/:id/sync-models', authMiddleware, syncModels);

module.exports = router;