const express = require('express');
const { 
    createFinancialYear, 
    getFinancialYears, 
    closeFinancialYear 
    } = require('../controllers/financialYearController');
const authMiddleware = require('../middleware/authMiddleware');
const isApprovedMiddleware = require('../middleware/isApprovedMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, createFinancialYear);
router.get('/', authMiddleware, isApprovedMiddleware, getFinancialYears);
router.put('/:id/close', authMiddleware, adminMiddleware, closeFinancialYear);

module.exports = router;
