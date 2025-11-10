const defaultAccounts = [
  // ------------------ ASSETS ------------------
  { accountName: "Cash", accountType: "debit", category: "Asset", subCategory: "Current Asset", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet", cashFlowSection: "Operating" },
  { accountName: "Accounts Receivable", accountType: "debit", category: "Asset", subCategory: "Current Asset", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet", cashFlowSection: "Operating" },
  { accountName: "Inventory", accountType: "debit", category: "Asset", subCategory: "Current Asset", financeType: "hybrid", businessType: "merchandising", financialStatement: "Balance Sheet", cashFlowSection: "Operating" },
  { accountName: "Prepaid Expenses", accountType: "debit", category: "Asset", subCategory: "Prepaid Expense", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet", cashFlowSection: "Operating" },
  { accountName: "Advance Tax", accountType: "debit", category: "Asset", subCategory: "Deferred Tax Asset", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet", cashFlowSection: "Operating" },
  { accountName: "Short-Term Investments", accountType: "debit", category: "Asset", subCategory: "Investment - Current", financeType: "conventional", businessType: "hybrid", financialStatement: "Balance Sheet", cashFlowSection: "Investing" },
  { accountName: "Islamic Investment (Mudarabah/Musharakah)", accountType: "debit", category: "Asset", subCategory: "Investment - Current", financeType: "islamic", businessType: "hybrid", financialStatement: "Balance Sheet", cashFlowSection: "Investing" },

  { accountName: "Property, Plant & Equipment", accountType: "debit", category: "Asset", subCategory: "Non-current Asset", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet", cashFlowSection: "Investing" },
  { accountName: "Accumulated Depreciation", accountType: "credit", category: "Asset", subCategory: "Accumulated Depreciation", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet", cashFlowSection: "NA" },
  { accountName: "Intangible Assets", accountType: "debit", category: "Asset", subCategory: "Non-current Asset", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet", cashFlowSection: "Investing" },
  { accountName: "Long-Term Investments", accountType: "debit", category: "Asset", subCategory: "Investment - Non-current", financeType: "conventional", businessType: "hybrid", financialStatement: "Balance Sheet", cashFlowSection: "Investing" },
  { accountName: "Right of Use Asset", accountType: "debit", category: "Asset", subCategory: "Non-current Asset", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet", cashFlowSection: "Investing" },
  { accountName: "Deferred Tax Asset", accountType: "debit", category: "Asset", subCategory: "Deferred Tax Asset", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet", cashFlowSection: "Operating" },

  // ------------------ LIABILITIES ------------------
  { accountName: "Accounts Payable", accountType: "credit", category: "Liability", subCategory: "Current Liability", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet", cashFlowSection: "Operating" },
  { accountName: "Accrued Expenses", accountType: "credit", category: "Liability", subCategory: "Current Liability", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet", cashFlowSection: "Operating" },
  { accountName: "Short-Term Loan", accountType: "credit", category: "Liability", subCategory: "Current Liability", financeType: "conventional", businessType: "hybrid", financialStatement: "Balance Sheet", cashFlowSection: "Financing" },
  { accountName: "Murabaha Payable", accountType: "credit", category: "Liability", subCategory: "Current Liability", financeType: "islamic", businessType: "hybrid", financialStatement: "Balance Sheet", cashFlowSection: "Financing" },
  { accountName: "Unearned Revenue", accountType: "credit", category: "Liability", subCategory: "Deferred Revenue", financeType: "hybrid", businessType: "service", financialStatement: "Balance Sheet", cashFlowSection: "Operating" },
  { accountName: "Taxes Payable", accountType: "credit", category: "Liability", subCategory: "Current Liability", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet", cashFlowSection: "Operating" },
  { accountName: "Dividends Payable", accountType: "credit", category: "Liability", subCategory: "Current Liability", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet", cashFlowSection: "Financing" },

  { accountName: "Long-Term Loan", accountType: "credit", category: "Liability", subCategory: "Non-current Liability", financeType: "conventional", businessType: "hybrid", financialStatement: "Balance Sheet", cashFlowSection: "Financing" },
  { accountName: "Lease Liability", accountType: "credit", category: "Liability", subCategory: "Lease Liability", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet", cashFlowSection: "Financing" },
  { accountName: "Deferred Tax Liability", accountType: "credit", category: "Liability", subCategory: "Non-current Liability", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet", cashFlowSection: "Operating" },
  { accountName: "Provision for Gratuity", accountType: "credit", category: "Liability", subCategory: "Provision", financeType: "hybrid", businessType: "hybrid", financialStatement: "Balance Sheet", cashFlowSection: "Operating" },
  { accountName: "Sukuk Payable", accountType: "credit", category: "Liability", subCategory: "Non-current Liability", financeType: "islamic", businessType: "hybrid", financialStatement: "Balance Sheet", cashFlowSection: "Financing" },

  // ------------------ EQUITY ------------------
  { accountName: "Owner’s Capital", accountType: "credit", category: "Equity", subCategory: "Equity", financeType: "hybrid", businessType: "hybrid", financialStatement: "Statement of Changes in Equity", cashFlowSection: "NA" },
  { accountName: "Retained Earnings", accountType: "credit", category: "Equity", subCategory: "Retained Earnings", financeType: "hybrid", businessType: "hybrid", financialStatement: "Statement of Changes in Equity", cashFlowSection: "NA" },
  { accountName: "Drawings", accountType: "debit", category: "Equity", subCategory: "Treasury Shares", financeType: "hybrid", businessType: "hybrid", financialStatement: "Statement of Changes in Equity", cashFlowSection: "Financing" },
  { accountName: "Share Capital", accountType: "credit", category: "Equity", subCategory: "Share Capital", financeType: "hybrid", businessType: "hybrid", financialStatement: "Statement of Changes in Equity", cashFlowSection: "Financing" },
  { accountName: "Share Premium", accountType: "credit", category: "Equity", subCategory: "Share Premium", financeType: "hybrid", businessType: "hybrid", financialStatement: "Statement of Changes in Equity", cashFlowSection: "Financing" },
  { accountName: "Revaluation Surplus", accountType: "credit", category: "Equity", subCategory: "Revaluation Surplus", financeType: "hybrid", businessType: "hybrid", financialStatement: "Comprehensive Income", cashFlowSection: "NA" },

  // ------------------ REVENUE ------------------
  { accountName: "Sales Revenue", accountType: "credit", category: "Revenue", subCategory: "Revenue", financeType: "hybrid", businessType: "merchandising", financialStatement: "Income Statement", cashFlowSection: "Operating" },
  { accountName: "Service Revenue", accountType: "credit", category: "Revenue", subCategory: "Revenue", financeType: "hybrid", businessType: "service", financialStatement: "Income Statement", cashFlowSection: "Operating" },
  { accountName: "Sales Returns & Allowances", accountType: "debit", category: "Revenue", subCategory: "Contra Revenue", financeType: "hybrid", businessType: "merchandising", financialStatement: "Income Statement", cashFlowSection: "Operating" },
  { accountName: "Discount Allowed", accountType: "debit", category: "Revenue", subCategory: "Contra Revenue", financeType: "hybrid", businessType: "hybrid", financialStatement: "Income Statement", cashFlowSection: "Operating" },
  { accountName: "Other Income", accountType: "credit", category: "Revenue", subCategory: "Non-operating Income", financeType: "hybrid", businessType: "hybrid", financialStatement: "Income Statement", cashFlowSection: "Operating" },
  { accountName: "Finance Income", accountType: "credit", category: "Revenue", subCategory: "Interest Income", financeType: "conventional", businessType: "hybrid", financialStatement: "Income Statement", cashFlowSection: "Investing" },
  { accountName: "Profit from Mudarabah Investment", accountType: "credit", category: "Revenue", subCategory: "Non-operating Income", financeType: "islamic", businessType: "hybrid", financialStatement: "Income Statement", cashFlowSection: "Investing" },

  // ------------------ EXPENSES ------------------
  { accountName: "Cost of Goods Sold", accountType: "debit", category: "Expense", subCategory: "Cost of Goods Sold", financeType: "hybrid", businessType: "merchandising", financialStatement: "Income Statement", cashFlowSection: "Operating" },
  { accountName: "Raw Material Consumed", accountType: "debit", category: "Expense", subCategory: "Operating Expense", financeType: "hybrid", businessType: "manufacturing", financialStatement: "Income Statement", cashFlowSection: "Operating" },
  { accountName: "Direct Labor", accountType: "debit", category: "Expense", subCategory: "Operating Expense", financeType: "hybrid", businessType: "manufacturing", financialStatement: "Income Statement", cashFlowSection: "Operating" },
  { accountName: "Factory Overheads", accountType: "debit", category: "Expense", subCategory: "Operating Expense", financeType: "hybrid", businessType: "manufacturing", financialStatement: "Income Statement", cashFlowSection: "Operating" },
  { accountName: "Administrative Expenses", accountType: "debit", category: "Expense", subCategory: "Operating Expense", financeType: "hybrid", businessType: "hybrid", financialStatement: "Income Statement", cashFlowSection: "Operating" },
  { accountName: "Selling & Distribution Expenses", accountType: "debit", category: "Expense", subCategory: "Operating Expense", financeType: "hybrid", businessType: "hybrid", financialStatement: "Income Statement", cashFlowSection: "Operating" },
  { accountName: "Research & Development", accountType: "debit", category: "Expense", subCategory: "Operating Expense", financeType: "hybrid", businessType: "manufacturing", financialStatement: "Income Statement", cashFlowSection: "Operating" },
  { accountName: "Finance Cost", accountType: "debit", category: "Expense", subCategory: "Interest Expense", financeType: "conventional", businessType: "hybrid", financialStatement: "Income Statement", cashFlowSection: "Financing" },
  { accountName: "Charity / Zakat Expense", accountType: "debit", category: "Expense", subCategory: "Non-operating Expense", financeType: "islamic", businessType: "hybrid", financialStatement: "Income Statement", cashFlowSection: "Operating" },
  { accountName: "Depreciation Expense", accountType: "debit", category: "Expense", subCategory: "Operating Expense - Depreciation", financeType: "hybrid", businessType: "hybrid", financialStatement: "Income Statement", cashFlowSection: "Operating" },
  { accountName: "Amortization Expense", accountType: "debit", category: "Expense", subCategory: "Operating Expense - Depreciation", financeType: "hybrid", businessType: "hybrid", financialStatement: "Income Statement", cashFlowSection: "Operating" },
  { accountName: "Impairment Loss", accountType: "debit", category: "Expense", subCategory: "Other Comprehensive Income - FVOCI", financeType: "hybrid", businessType: "hybrid", financialStatement: "Comprehensive Income", cashFlowSection: "Operating" },
  { accountName: "Tax Expense", accountType: "debit", category: "Expense", subCategory: "Tax Expense", financeType: "hybrid", businessType: "hybrid", financialStatement: "Income Statement", cashFlowSection: "Operating" },
  { accountName: "CSR Expense", accountType: "debit", category: "Expense", subCategory: "Other Comprehensive Income - Remeasurements", financeType: "hybrid", businessType: "hybrid", financialStatement: "Comprehensive Income", cashFlowSection: "Operating" },
];

module.exports = defaultAccounts;
