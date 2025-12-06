const mongoose = require("mongoose");

const BudgetItemSchema = new mongoose.Schema({
  category: { type: String, required: true },
  subCategory: { type: String, default: null },
  budgetedAmount: { type: Number, required: true },
});

const BudgetSchema = new mongoose.Schema({
  financialYear: { type: mongoose.Types.ObjectId, ref: 'FinancialYear', required: true }, 
  revenue: BudgetItemSchema,
  cogs: BudgetItemSchema,
  operatingExpenses: BudgetItemSchema,
  capex: BudgetItemSchema,
  cashInflows: BudgetItemSchema,
  cashOutflows: BudgetItemSchema,
  netIncome: BudgetItemSchema,

  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Budget", BudgetSchema);
