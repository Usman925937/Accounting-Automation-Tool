const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    industry: {
        type: String
    },
    address: {
        type: String
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        enum: ['Conventional', 'Islamic'],
        default: 'Conventional'
    },
    accounts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Account'
    }]
}, {timestamps: true});

const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;