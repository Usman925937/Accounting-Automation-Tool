const express = require('express');
const { 
    createJournalEntry, getJournalEntries, approveEntry, rejectEntry 
    } = require('../controllers/journalEntryController');
const authMiddleware = require('../middleware/authMiddleware');
const isApprovedMiddleware = require('../middleware/isApprovedMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.post('/', authMiddleware, isApprovedMiddleware, createJournalEntry);
router.get('/', authMiddleware, isApprovedMiddleware, getJournalEntries);
router.put('/:id/approve', authMiddleware, adminMiddleware, approveEntry);
router.put('/:id/reject', authMiddleware, adminMiddleware, rejectEntry);

export default router;
