const express = require('express');
const router = express.Router();
const { getModels, syncModels } = require('../controllers/modelController');
const { protect } = require('../middleware/authMiddleware');

router.route('/:providerId').get(protect, getModels);
router.route('/:providerId/sync').post(protect, syncModels);

module.exports = router;