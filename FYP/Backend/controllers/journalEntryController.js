const JournalEntry = require('../models/JournalEntry');
const FinancialYear = require('../models/FinancialYear');
const Account = require('../models/Account');

// Create journal entry
exports.createJournalEntry = async (req, res) => {
  try {
    const { description, debitAccount, creditAccount, amount, date } = req.body;
    const user = req.user;

    // Validate financial year
    const year = await FinancialYear.findOne({ companyId: user.company, isActive: true });

    if (!year) return res.status(400).json({ message: 'No active financial year found' });

    // Validate date within financial year
    const entryDate = new Date(date);
    if (entryDate < year.startDate || entryDate > year.endDate) {
      return res.status(400).json({ message: 'Date outside financial year range' });
    }

    // fetch debit and credit accounts
    const debitAcc = await Account.findOne({ accountName: debitAccount });
    const creditAcc = await Account.findOne({ accountName: creditAccount });

    if (!debitAcc || !creditAcc) {
      return res.status(400).json({ message: 'Invalid debit or credit account' });
    }

    // Create and save journal entry
    const entry = await JournalEntry.create({
      description,
      debitAccount: debitAcc._id,
      creditAccount: creditAcc._id,
      amount,
      date: entryDate,
      financialYear: year._id,
      company: user.company,
      createdBy: user._id,
      approved: true
    });

    // Update account balances
    if (debitAcc.accountType === 'debit') {
      debitAcc.balance += amount;
    } else if (debitAcc.accountType === 'credit') {
      debitAcc.balance -= amount;
    }

    if (creditAcc.accountType === 'credit') {
      creditAcc.balance += amount;
    } else if (creditAcc.accountType === 'debit') {
      creditAcc.balance -= amount;
    }

    await debitAcc.save();
    await creditAcc.save();

    const accounts = await Account.find({ company: user.company });
    const entries = await JournalEntry.find({ company: user.company, financialYear: year._id })
      .populate('debitAccount')
      .populate('creditAccount')
      .populate('createdBy', 'name email')
      .sort({ date: -1 });

    res.status(201).json({ message: 'Journal entry passed successfully', accounts, entries });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all journal entries for current company
exports.getJournalEntries = async (req, res) => {
  const { fy } = useParams();

  try {
    const entries = await JournalEntry.find({ 
      company: req.user.company,
      financialYear: fy ? fy : undefined
    })
      .populate('debitAccount', 'accountName accountType')
      .populate('creditAccount', 'accountName accountType')
      .populate('createdBy', 'name email')
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