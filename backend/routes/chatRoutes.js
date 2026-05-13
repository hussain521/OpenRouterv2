const express = require('express');
const router = express.Router();
const { chatCompletion } = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/completions', authMiddleware, chatCompletion);

module.exports = router;