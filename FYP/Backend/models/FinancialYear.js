const mongoose = require("mongoose");

const FinancialYearSchema = new mongoose.Schema({
    companyId: {
        types: mongoose.Types.ObjectId,
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
    },
    isClosed: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});

const FinancialYear = mongoose.model("FinancialYear", FinancialYearSchema);
module.exports = FinancialYear;