const express = require('express');
const router = express.Router();
const { getUserBalance, depositBalance } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/balance', authMiddleware, getUserBalance);
router.post('/deposit', authMiddleware, depositBalance);

module.exports = router;