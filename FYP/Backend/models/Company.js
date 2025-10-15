const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    companyName: {
        type: String,
        unique: true,
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
    financeType: {
        type: String,
        enum: ['conventional', 'islamic'],
        default: 'conventional'
    },
    businessType: {
        type: String,
        enum: ['service', 'merchandising', 'manufacturing', 'hybrid'],
        default: 'Hybrid'
    }
}, {timestamps: true});

const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;