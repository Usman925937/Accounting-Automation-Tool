const Account = require('../models/Account');
const FinancialYear = require('../models/FinancialYear');
const Company = require('../models/Company');
const JournalEntry = require('../models/JournalEntry');
const Note = require('../models/Note');

exports.initialSetup = async (req, res) => {
    const company = await Company.findById(req.user.company);

    const accounts = await Account.find({ company: company._id });

    const financialYear = await FinancialYear.findOne({
        companyId: company._id, isActive: true
    });
    const financialYears = await FinancialYear.find({ companyId: company._id });

    const journalEntries = await JournalEntry.find({
        company: company._id, financialYear: financialYear._id
    })
        .populate('createdBy', 'name email')
        .populate('debitAccount')
        .populate('creditAccount')
        .sort({ date: -1, createdAt: -1 });

    const notes = await Note.find({ financialYear: financialYear._id });

    res.status(200).json({
        message: "App started successfully",
        accounts,
        financialYear,
        financialYears,
        journalEntries,
        notes
    });
}