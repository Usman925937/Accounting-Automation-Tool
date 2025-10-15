const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const isApprovedMiddleware = require('../middleware/isApprovedMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const {
    getMe,
    getUser,
    getUsers,
    approveAccountant,
    deleteUser
} = require('../controllers/userController');

const router = express.Router();

router.get('/me', authMiddleware, getMe);
router.get('/:id', authMiddleware, isApprovedMiddleware, getUser);
router.get('/', authMiddleware, adminMiddleware, getUsers);
router.put('/:id', authMiddleware, adminMiddleware, approveAccountant);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);

module.exports = router;