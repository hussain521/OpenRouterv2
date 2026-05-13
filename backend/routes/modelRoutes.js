const express = require('express');
const router = express.Router();
const {
    addModel,
    getModels,
    deleteModel
} = require('../controllers/modelController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addModel);
router.get('/', authMiddleware, getModels);
router.delete('/:id', authMiddleware, deleteModel);

module.exports = router;