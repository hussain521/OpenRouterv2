const express = require('express');
const router = express.Router();
const { getUserBalance, getUserUsage } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/balance', protect, getUserBalance);
router.get('/usage', protect, getUserUsage);

module.exports = router;