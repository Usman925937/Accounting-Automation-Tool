const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
    accountName: {
        type: String,
        required: true
    },
    accountType: {
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
    yearlyBalances: [{
        financialYear: {
            type: mongoose.Types.ObjectId,
            ref: 'FinancialYear'
        },
        openingBalance: Number,
        closingBalance: Number
    }]

}, { timestamps: true });

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;