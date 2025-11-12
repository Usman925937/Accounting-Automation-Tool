const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
    accountName: {
        type: String,
        required: true,
    },

    accountType: {
        type: String,
        enum: ["debit", "credit"],
        required: true,
    },

    category: {
        type: String,
        enum: ["Asset", "Liability", "Equity", "Revenue", "Expense"],
        required: true,
    },

    subCategory: {
        type: String,
        enum: [
            // --- Balance Sheet: Assets ---
            "Current Asset",
            "Non-current Asset",
            "Contra Asset",

            // --- Balance Sheet: Liabilities ---
            "Current Liability",
            "Non-current Liability",
            "Contra Liability",

            // --- Equity ---
            "Equity",
            "Share Capital",
            "Share Premium",
            "Retained Earnings",
            "Appropriation - Reserves",   // e.g., Legal Reserve, General Reserve
            "Revaluation Surplus",
            "Treasury Shares",
            "Non-controlling Interest",

            // --- Income Statement & related ---
            "Revenue",
            "Contra Revenue",             // e.g., Sales Returns & Allowances
            "Cost of Goods Sold",
            "Operating Expense",
            "Operating Expense - Depreciation",
            "Non-operating Income",
            "Non-operating Expense",
            "Interest Income",
            "Interest Expense",
            "Tax Expense",

            // --- Comprehensive income / OCI items ---
            "Other Comprehensive Income - Remeasurements",       // e.g., actuarial gains/losses
            "Other Comprehensive Income - Foreign Translation", // FX translation reserves
            "Other Comprehensive Income - FVOCI",               // fair value through OCI gains/losses
            "Other Comprehensive Income - Cash Flow Hedge",

            // --- Misc / Other ---
            "Interim/Accruals",
            "Suspense",
            "Other",
        ],
        required: true,
    },

    financialStatement:{
        type: String,
        enum: [
            "Balance Sheet",
            "Income Statement",
            "Comprehensive Income",
            "Statement of Changes in Equity"
        ]
    },

    cashFlowSection: {
        type: String,
        enum: ["Operating", "Investing", "Financing", "NA"],
        default: "NA",
    },

    businessType: {
        type: String,
        enum: ['service', 'merchandising', 'manufacturing', 'hybrid']
    },

    financeType: {
        type: String,
        enum: ['conventional', 'islamic', 'hybrid']
    },

    // Yearly tracking of balances
    yearlyBalances: [
        {
            financialYear: {
                type: mongoose.Types.ObjectId,
                ref: "FinancialYear",
            },
            openingBalance: {
                type: Number,
                default: 0,
            },
            closingBalance: {
                type: Number,
                default: 0,
            },
        },
    ],

    // Current running balance (useful for quick queries)
    balance: {
        type: Number,
        default: 0,
    },

    // Owning company
    company: {
        type: mongoose.Types.ObjectId,
        ref: "Company",
        required: true,
    },
}, { timestamps: true });

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;
