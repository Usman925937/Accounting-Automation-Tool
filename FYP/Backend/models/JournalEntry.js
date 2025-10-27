const mongoose = require('mongoose');

const JournalEntrySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  debitAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  creditAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  financialYear: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FinancialYear',
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  approved: {
    type: Boolean,
    default: true,
  },
});

const JournalEntry = mongoose.model("JournalEntry", JournalEntrySchema);
module.exports = JournalEntry;