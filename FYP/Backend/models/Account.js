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
    openingBalance: {
        type: Number,
        default: 0
    },
    currentBalance: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;