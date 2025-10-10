const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
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
router.get('/:id', authMiddleware, getUser);
router.get('/', authMiddleware, getUsers);
router.put('/:id', authMiddleware, adminMiddleware, approveAccountant);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);

module.exports = router;