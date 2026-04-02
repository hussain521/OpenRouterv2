const express = require('express');
const router = express.Router();
const { getUsageLogs } = require('../controllers/usageController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getUsageLogs);

module.exports = router;