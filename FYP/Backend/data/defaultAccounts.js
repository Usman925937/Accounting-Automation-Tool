// Default chart of accounts for every new company
const defaultAccounts = [
    // 🏦 ASSETS
    { accountName: "Cash", accountType: "debit", category: "Asset", subCategory: "Current Asset" },
    { accountName: "Accounts Receivable", accountType: "debit", category: "Asset", subCategory: "Current Asset" },
    { accountName: "Inventory", accountType: "debit", category: "Asset", subCategory: "Current Asset" },
    { accountName: "Prepaid Expenses", accountType: "debit", category: "Asset", subCategory: "Current Asset" },
    { accountName: "Advance to Employees", accountType: "debit", category: "Asset", subCategory: "Current Asset" },
  
    // Non-current assets
    { accountName: "Property, Plant and Equipment", accountType: "debit", category: "Asset", subCategory: "Non-current Asset" },
    { accountName: "Accumulated Depreciation", accountType: "credit", category: "Asset", subCategory: "Contra Asset" },
    { accountName: "Intangible Assets", accountType: "debit", category: "Asset", subCategory: "Non-current Asset" },
    { accountName: "Long-term Investments", accountType: "debit", category: "Asset", subCategory: "Non-current Asset" },
    { accountName: "Deferred Tax Asset", accountType: "debit", category: "Asset", subCategory: "Non-current Asset" },
  
    // ⚖️ LIABILITIES
    { accountName: "Accounts Payable", accountType: "credit", category: "Liability", subCategory: "Current Liability" },
    { accountName: "Accrued Expenses", accountType: "credit", category: "Liability", subCategory: "Current Liability" },
    { accountName: "Short-term Loans", accountType: "credit", category: "Liability", subCategory: "Current Liability" },
    { accountName: "Taxes Payable", accountType: "credit", category: "Liability", subCategory: "Current Liability" },
    { accountName: "Unearned Revenue", accountType: "credit", category: "Liability", subCategory: "Current Liability" },
  
    // Non-current liabilities
    { accountName: "Long-term Loans", accountType: "credit", category: "Liability", subCategory: "Non-current Liability" },
    { accountName: "Deferred Tax Liability", accountType: "credit", category: "Liability", subCategory: "Non-current Liability" },
    { accountName: "Employee Retirement Benefits", accountType: "credit", category: "Liability", subCategory: "Non-current Liability" },
    { accountName: "Lease Liability", accountType: "credit", category: "Liability", subCategory: "Non-current Liability" },
  
    // 💼 EQUITY
    { accountName: "Share Capital", accountType: "credit", category: "Equity", subCategory: "Equity" },
    { accountName: "Share Premium", accountType: "credit", category: "Equity", subCategory: "Equity" },
    { accountName: "Retained Earnings", accountType: "credit", category: "Equity", subCategory: "Equity" },
    { accountName: "Revaluation Reserve", accountType: "credit", category: "Equity", subCategory: "Equity" },
    { accountName: "Dividend Payable", accountType: "credit", category: "Equity", subCategory: "Equity" },
  
    // 💰 REVENUE
    { accountName: "Sales Revenue", accountType: "credit", category: "Revenue", subCategory: "Operating Revenue" },
    { accountName: "Service Revenue", accountType: "credit", category: "Revenue", subCategory: "Operating Revenue" },
    { accountName: "Other Income", accountType: "credit", category: "Revenue", subCategory: "Non-operating Income" },
    { accountName: "Gain on Disposal of Asset", accountType: "credit", category: "Revenue", subCategory: "Non-operating Income" },
    { accountName: "Interest Income", accountType: "credit", category: "Revenue", subCategory: "Non-operating Income" },
  
    // 📉 EXPENSES
    // Cost of goods
    { accountName: "Cost of Goods Sold", accountType: "debit", category: "Expense", subCategory: "Operating Expense" },
    { accountName: "Purchases", accountType: "debit", category: "Expense", subCategory: "Operating Expense" },
    { accountName: "Freight Inward", accountType: "debit", category: "Expense", subCategory: "Operating Expense" },
  
    // Operating expenses
    { accountName: "Salaries Expense", accountType: "debit", category: "Expense", subCategory: "Operating Expense" },
    { accountName: "Rent Expense", accountType: "debit", category: "Expense", subCategory: "Operating Expense" },
    { accountName: "Utilities Expense", accountType: "debit", category: "Expense", subCategory: "Operating Expense" },
    { accountName: "Depreciation Expense", accountType: "debit", category: "Expense", subCategory: "Operating Expense" },
    { accountName: "Insurance Expense", accountType: "debit", category: "Expense", subCategory: "Operating Expense" },
    { accountName: "Advertising Expense", accountType: "debit", category: "Expense", subCategory: "Operating Expense" },
    { accountName: "Repair and Maintenance", accountType: "debit", category: "Expense", subCategory: "Operating Expense" },
    { accountName: "Office Supplies", accountType: "debit", category: "Expense", subCategory: "Operating Expense" },
    { accountName: "Telephone and Internet", accountType: "debit", category: "Expense", subCategory: "Operating Expense" },
  
    // Financial and other expenses
    { accountName: "Interest Expense", accountType: "debit", category: "Expense", subCategory: "Financial Expense" },
    { accountName: "Bank Charges", accountType: "debit", category: "Expense", subCategory: "Financial Expense" },
    { accountName: "Loss on Disposal of Asset", accountType: "debit", category: "Expense", subCategory: "Non-operating Expense" },
    { accountName: "Tax Expense", accountType: "debit", category: "Expense", subCategory: "Non-operating Expense" },
  ];
  

module.exports = defaultAccounts;