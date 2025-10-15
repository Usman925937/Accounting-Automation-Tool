const defaultAccounts = [
  // ------------------ ASSETS ------------------
  { accountName: "Cash", accountType: "debit", category: "Asset", subCategory: "Current Asset", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet" },
  { accountName: "Accounts Receivable", accountType: "debit", category: "Asset", subCategory: "Current Asset", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet" },
  { accountName: "Inventory", accountType: "debit", category: "Asset", subCategory: "Current Asset", financeType: "hybrid", businessType: "merchandising", financialStatement: "Balance Sheet" },
  { accountName: "Prepaid Expenses", accountType: "debit", category: "Asset", subCategory: "Current Asset", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet" },
  { accountName: "Advance Tax", accountType: "debit", category: "Asset", subCategory: "Current Asset", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet" },
  { accountName: "Short-Term Investments", accountType: "debit", category: "Asset", subCategory: "Current Asset", financeType: "conventional", businessType: "hybrid", financialStatement: "Balance Sheet" },
  { accountName: "Islamic Investment (Mudarabah/Musharakah)", accountType: "debit", category: "Asset", subCategory: "Current Asset", financeType: "islamic", businessType: "hybrid", financialStatement: "Balance Sheet" },

  { accountName: "Property, Plant & Equipment", accountType: "debit", category: "Asset", subCategory: "Non-Current Asset", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet" },
  { accountName: "Accumulated Depreciation", accountType: "credit", category: "Asset", subCategory: "Contra Asset", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet" },
  { accountName: "Intangible Assets", accountType: "debit", category: "Asset", subCategory: "Non-Current Asset", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet" },
  { accountName: "Long-Term Investments", accountType: "debit", category: "Asset", subCategory: "Non-Current Asset", financeType: "conventional", businessType: "hybrid", financialStatement: "Balance Sheet" },
  { accountName: "Right of Use Asset", accountType: "debit", category: "Asset", subCategory: "Non-Current Asset", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet" },
  { accountName: "Deferred Tax Asset", accountType: "debit", category: "Asset", subCategory: "Non-Current Asset", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet" },

  // ------------------ LIABILITIES ------------------
  { accountName: "Accounts Payable", accountType: "credit", category: "Liability", subCategory: "Current Liability", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet" },
  { accountName: "Accrued Expenses", accountType: "credit", category: "Liability", subCategory: "Current Liability", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet" },
  { accountName: "Short-Term Loan", accountType: "credit", category: "Liability", subCategory: "Current Liability", financeType: "conventional", businessType: "hybrid", financialStatement: "Balance Sheet" },
  { accountName: "Murabaha Payable", accountType: "credit", category: "Liability", subCategory: "Current Liability", financeType: "islamic", businessType: "hybrid", financialStatement: "Balance Sheet" },
  { accountName: "Unearned Revenue", accountType: "credit", category: "Liability", subCategory: "Current Liability", financeType: "hybrid", businessType: "service", financialStatement: "Balance Sheet" },
  { accountName: "Taxes Payable", accountType: "credit", category: "Liability", subCategory: "Current Liability", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet" },
  { accountName: "Dividends Payable", accountType: "credit", category: "Liability", subCategory: "Current Liability", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet" },

  { accountName: "Long-Term Loan", accountType: "credit", category: "Liability", subCategory: "Non-Current Liability", financeType: "conventional", businessType: "hybrid", financialStatement: "Balance Sheet" },
  { accountName: "Lease Liability", accountType: "credit", category: "Liability", subCategory: "Non-Current Liability", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet" },
  { accountName: "Deferred Tax Liability", accountType: "credit", category: "Liability", subCategory: "Non-Current Liability", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet" },
  { accountName: "Provision for Gratuity", accountType: "credit", category: "Liability", subCategory: "Non-Current Liability", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet" },
  { accountName: "Sukuk Payable", accountType: "credit", category: "Liability", subCategory: "Non-Current Liability", financeType: "islamic", businessType: "hybrid", financialStatement: "Balance Sheet" },

  // ------------------ EQUITY ------------------
  { accountName: "Owner’s Capital", accountType: "credit", category: "Equity", subCategory: "Owner’s Equity", financeType: "hybrid", businessType: "hybrid", financialStatement: "Owner’s Equity" },
  { accountName: "Retained Earnings", accountType: "credit", category: "Equity", subCategory: "Owner’s Equity", financeType: "hybrid", businessType: "hybrid", financialStatement: "Owner’s Equity" },
  { accountName: "Drawings", accountType: "debit", category: "Equity", subCategory: "Contra Equity", financeType: "hybrid", businessType: "hybrid", financialStatement: "Owner’s Equity" },
  { accountName: "Share Capital", accountType: "credit", category: "Equity", subCategory: "Shareholders’ Equity", financeType: "hybrid", businessType: "hybrid", financialStatement: "Owner’s Equity" },
  { accountName: "Share Premium", accountType: "credit", category: "Equity", subCategory: "Shareholders’ Equity", financeType: "hybrid", businessType: "hybrid", financialStatement: "Owner’s Equity" },
  { accountName: "Revaluation Surplus", accountType: "credit", category: "Equity", subCategory: "Other Comprehensive Income", financeType: "hybrid", businessType: "hybrid", financialStatement: "Comprehensive Income" },

  // ------------------ REVENUE ------------------
  { accountName: "Sales Revenue", accountType: "credit", category: "Revenue", subCategory: "Operating Revenue", financeType: "hybrid", businessType: "merchandising", financialStatement: "Income Statement" },
  { accountName: "Service Revenue", accountType: "credit", category: "Revenue", subCategory: "Operating Revenue", financeType: "hybrid", businessType: "service", financialStatement: "Income Statement" },
  { accountName: "Sales Returns & Allowances", accountType: "debit", category: "Revenue", subCategory: "Contra Revenue", financeType: "hybrid", businessType: "merchandising", financialStatement: "Income Statement" },
  { accountName: "Discount Allowed", accountType: "debit", category: "Revenue", subCategory: "Contra Revenue", financeType: "hybrid", businessType: "hybrid", financialStatement: "Income Statement" },
  { accountName: "Other Income", accountType: "credit", category: "Revenue", subCategory: "Non-Operating Income", financeType: "hybrid", businessType: "hybrid", financialStatement: "Income Statement" },
  { accountName: "Finance Income", accountType: "credit", category: "Revenue", subCategory: "Non-Operating Income", financeType: "conventional", businessType: "hybrid", financialStatement: "Income Statement" },
  { accountName: "Profit from Mudarabah Investment", accountType: "credit", category: "Revenue", subCategory: "Non-Operating Income", financeType: "islamic", businessType: "hybrid", financialStatement: "Income Statement" },

  // ------------------ EXPENSES ------------------
  { accountName: "Cost of Goods Sold", accountType: "debit", category: "Expense", subCategory: "Operating Expense", financeType: "hybrid", businessType: "merchandising", financialStatement: "Income Statement" },
  { accountName: "Raw Material Consumed", accountType: "debit", category: "Expense", subCategory: "Operating Expense", financeType: "hybrid", businessType: "manufacturing", financialStatement: "Income Statement" },
  { accountName: "Direct Labor", accountType: "debit", category: "Expense", subCategory: "Operating Expense", financeType: "hybrid", businessType: "manufacturing", financialStatement: "Income Statement" },
  { accountName: "Factory Overheads", accountType: "debit", category: "Expense", subCategory: "Operating Expense", financeType: "hybrid", businessType: "manufacturing", financialStatement: "Income Statement" },
  { accountName: "Administrative Expenses", accountType: "debit", category: "Expense", subCategory: "Operating Expense", financeType: "hybrid", businessType: "hybrid", financialStatement: "Income Statement" },
  { accountName: "Selling & Distribution Expenses", accountType: "debit", category: "Expense", subCategory: "Operating Expense", financeType: "hybrid", businessType: "hybrid", financialStatement: "Income Statement" },
  { accountName: "Research & Development", accountType: "debit", category: "Expense", subCategory: "Operating Expense", financeType: "hybrid", businessType: "manufacturing", financialStatement: "Income Statement" },
  { accountName: "Finance Cost", accountType: "debit", category: "Expense", subCategory: "Non-Operating Expense", financeType: "conventional", businessType: "hybrid", financialStatement: "Income Statement" },
  { accountName: "Charity / Zakat Expense", accountType: "debit", category: "Expense", subCategory: "Non-Operating Expense", financeType: "islamic", businessType: "hybrid", financialStatement: "Income Statement" },
  { accountName: "Depreciation Expense", accountType: "debit", category: "Expense", subCategory: "Operating Expense", financeType: "hybrid", businessType: "hybrid", financialStatement: "Income Statement" },
  { accountName: "Amortization Expense", accountType: "debit", category: "Expense", subCategory: "Operating Expense", financeType: "hybrid", businessType: "hybrid", financialStatement: "Income Statement" },
  { accountName: "Impairment Loss", accountType: "debit", category: "Expense", subCategory: "Non-Operating Expense", financeType: "hybrid", businessType: "hybrid", financialStatement: "Comprehensive Income" },
  { accountName: "Tax Expense", accountType: "debit", category: "Expense", subCategory: "Non-Operating Expense", financeType: "hybrid", businessType: "hybrid", financialStatement: "Income Statement" },
  { accountName: "CSR Expense", accountType: "debit", category: "Expense", subCategory: "Non-Operating Expense", financeType: "hybrid", businessType: "hybrid", financialStatement: "Comprehensive Income" }
];

module.exports = defaultAccounts