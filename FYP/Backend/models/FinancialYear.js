const mongoose = require("mongoose");

const FinancialYearSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Types.ObjectId,
        ref: 'Company'
    },
    name: {
        type: String, //e.g. FY2023-2024
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }

}, {timestamps: true});

const FinancialYear = mongoose.model("FinancialYear", FinancialYearSchema);
module.exports = FinancialYear;