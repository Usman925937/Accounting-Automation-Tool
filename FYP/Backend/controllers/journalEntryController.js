const JournalEntry = require('../models/JournalEntry.js');
const FinancialYear = require('../models/FinancialYear.js');

// Create journal entry
exports.createJournalEntry = async (req, res) => {
  try {
    const { description, debitAccount, creditAccount, amount, date, financialYearId } = req.body;
    const user = req.user;

    // Validate financial year
    let year;
    if (financialYearId) {
      year = await FinancialYear.findById(financialYearId);
    } else {
      year = await FinancialYear.findOne({ companyId: user.companyId, isActive: true });
    }

    if (!year) return res.status(400).json({ message: 'No active financial year found' });

    // Validate date within financial year
    const entryDate = new Date(date);
    if (entryDate < year.startDate || entryDate > year.endDate) {
      return res.status(400).json({ message: 'Date outside financial year range' });
    }

    // Create and save journal entry
    const entry = await JournalEntry.create({
      description,
      debitAccount,
      creditAccount,
      amount,
      date: entryDate,
      financialYear: year._id,
      createdBy: user._id,
    });

    res.status(201).json({ message: 'Journal entry passed successfully', entry });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all journal entries for current company
exports.getJournalEntries = async (req, res) => {
  try {
    const entries = await JournalEntry.find({ companyId: req.user.company })
      .populate('debitAccount creditAccount financialYear createdBy', 'name email startDate endDate')
      .sort({ date: -1 });
    res.json({ message: 'Journal entries fetched successfully', entries });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve an entry (for admin/senior accountant)
exports.approveEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const entry = await JournalEntry.findById(id);
    if (!entry) return res.status(404).json({ message: 'Entry not found' });

    entry.approved = true;
    await entry.save();

    res.json({ message: 'Entry approved successfully', entry });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reject an entry (for admin/senior accountant)
exports.rejectEntry = async (req, res) => {
    try {
      const { id } = req.params;
  
      const entry = await JournalEntry.findByIdAndDelete(id);
  
      res.json({ message: 'Entry deleted successfully', entry });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };