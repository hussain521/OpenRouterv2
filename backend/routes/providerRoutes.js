const express = require('express');
const router = express.Router();
const { addProvider, getProviders, deleteProvider } = require('../controllers/providerController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, addProvider).get(protect, getProviders);
router.route('/:id').delete(protect, deleteProvider);

module.exports = router;