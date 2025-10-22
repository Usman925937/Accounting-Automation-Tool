const express = require('express');
const { 
    createFinancialYear, 
    getFinancialYears, 
    getActiveFinancialYear,
    closeFinancialYear,
    deleteFinancialYear
    } = require('../controllers/financialYearController');

const authMiddleware = require('../middleware/authMiddleware');
const isApprovedMiddleware = require('../middleware/isApprovedMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, createFinancialYear);
router.get('/', authMiddleware, isApprovedMiddleware, getFinancialYears);
router.get('/active', authMiddleware, isApprovedMiddleware, getActiveFinancialYear);
router.put('/:id/close', authMiddleware, adminMiddleware, closeFinancialYear);
router.delete('/:id', authMiddleware, adminMiddleware, deleteFinancialYear);

module.exports = router;
