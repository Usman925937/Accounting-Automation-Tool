const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
    accountName: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        enum: ['debit', 'credit'],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    financialStatement: {
        type: String
    },
    yearlyBalances: [{
        financialYear: {
            type: mongoose.Types.ObjectId,
            ref: 'FinancialYear'
        },
        openingBalance: {
            type: Number,
            default: 0
        },
        closingBalance: {
            type: Number,
            default: 0
        }
    }],
    balance: {
        type: Number,
        default: 0
    },
    company: {
        type: mongoose.Types.ObjectId,
        ref: 'Company',
        required: true
    }

}, { timestamps: true });

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;