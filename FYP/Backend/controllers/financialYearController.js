const FinancialYear = require('../models/FinancialYear.js');

// Create a new financial year
exports.createFinancialYear = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

        // Check for existing active financial year
        const existingActive = await FinancialYear.findOne({
            companyId: req.user.companyId,
            isActive: true,
        });

        if (existingActive) {
            return res.status(400).json({ message: 'An active financial year already exists.' });
        }

        // Create and save the new financial year
        const year = await FinancialYear.create({
            companyId: req.user.company,
            name: `FY${new Date(startDate).getFullYear()}-${new Date(endDate).getFullYear()}`,
            startDate,
            endDate,
            isActive: true,
        });

        res.status(201).json({
            message: 'Financial year successfully created', 
            financialYear: year});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all financial years for a company
exports.getFinancialYears = async (req, res) => {
    try {
        const years = await FinancialYear
            .find({ companyId: req.user.company })
            .sort({ startDate: -1 });

        res.json({ message: 'Financial years retrieved successfully', financialYears: years });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Close a financial year
exports.closeFinancialYear = async (req, res) => {
    try {
        const { id } = req.params;

        const year = await FinancialYear.findById(id);
        if (!year) return res.status(404).json({ message: 'Financial year not found' });

        year.isActive = false;
        await year.save();

        res.json({ message: 'Financial year closed successfully' });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
