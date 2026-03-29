const express = require('express');
const router = express.Router();
const { createChatCompletion } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.route('/completions').post(protect, createChatCompletion);

module.exports = router;