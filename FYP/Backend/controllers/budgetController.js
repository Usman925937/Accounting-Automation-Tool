const Budget = require("../models/Budget");
const Company = require("../models/Company");
const FinancialYear = require("../models/FinancialYear");

// ----------------------------------------------------------
// Get all budgets for a company
// ----------------------------------------------------------
exports.getBudgets = async (req, res) => {
    try {
        const company = await Company.findById(req.user.company);
        if (!company)
            return res.status(404).json({ message: "Company not found" });

        const budgets = await Budget.find({ company: req.user.company });

        res.status(200).json({
            message: "Budgets fetched successfully",
            budgets,
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching budgets",
            error: error.message,
        });
    }
};

// ----------------------------------------------------------
// Get a single budget (must belong to company)
// ----------------------------------------------------------
exports.getBudget = async (req, res) => {
    try {
        const currentFY = await FinancialYear.findOne({
            company: req.user.company,
            isActive: true,
        });

        const budget = await Budget.findOne({
            financialYear: currentFY._id
        }).populate('financialYear');

        if (!budget)
            return res
                .status(404)
                .json({ message: "Budget not found for this financial year" });

        res.status(200).json({
            message: "Budget fetched successfully",
            budget,
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching budget",
            error: error.message,
        });
    }
};

// ----------------------------------------------------------
// Create a budget for a company
// ----------------------------------------------------------
exports.createBudget = async (req, res) => {
    try {
        const {
            revenue,
            cogs,
            operatingExpenses,
            capex,
            cashInflows,
            cashOutflows,
            netIncome
        } = req.body;

        const FY = await FinancialYear.findOne({
            company: req.user.company,
            isActive: true,
        });
        if (!FY)
            return res.status(400).json({ message: "Financial year is required" });

        const budgets = await Budget.find({
            financialYear: FY._id
        });
        if (budgets.length > 0) {
            return res.status(400).json({ message: "Budget for this financial year already exists" });
        }

        let budget = await Budget.create({
            financialYear: FY._id,
            revenue,
            cogs,
            operatingExpenses,
            capex,
            cashInflows,
            cashOutflows,
            netIncome,
            createdBy: req.user._id,
            company: req.user.company,
        });

        await budget.save();

        const createdBudget = await Budget.findById(budget._id).populate('financialYear');

        res.status(201).json({
            message: "Budget created successfully",
            budget: createdBudget,
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating budget",
            error: error.message,
        });
    }
};

// ----------------------------------------------------------
// Update a budget
// ----------------------------------------------------------
exports.updateBudget = async (req, res) => {
    try {
        const FY = await FinancialYear.findOne({
            company: req.user.company,
            isActive: true,
        });
        if (!FY)
            return res.status(400).json({ message: "Financial year is required" });

        const {
            revenue,
            cogs,
            operatingExpenses,
            capex,
            cashInflows,
            cashOutflows,
            netIncome
        } = req.body;

        let budget = await Budget.findOne({
            financialYear: FY._id,
        });

        if (!budget)
            return res
                .status(404)
                .json({ message: "Budget not found for this company" });

        // Update fields
        budget.revenue = revenue;
        budget.cogs = cogs;
        budget.operatingExpenses = operatingExpenses;
        budget.capex = capex;
        budget.cashInflows = cashInflows;
        budget.cashOutflows = cashOutflows;
        budget.netIncome = netIncome;

        await budget.save();

        const updatedBudget = await Budget.findById(budget._id).populate('financialYear');

        res.status(200).json({
            message: "Budget updated successfully",
            budget: updatedBudget,
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating budget",
            error: error.message,
        });
    }
};

// ----------------------------------------------------------
// Delete a single budget
// ----------------------------------------------------------
exports.deleteBudget = async (req, res) => {
    try {
        const budget = await Budget.findOneAndDelete({
            _id: req.params.budgetId,
            company: req.user.company,
        });

        if (!budget)
            return res
                .status(404)
                .json({ message: "Budget not found for this company" });

        res.status(200).json({
            message: "Budget deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting budget",
            error: error.message,
        });
    }
};

