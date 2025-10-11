const Account = require("../models/Account");
const Company = require("../models/Company");
const mongoose = require("mongoose");

// Get all accounts for a specific company
exports.getAccounts = async (req, res) => {
  try {
    const { companyId } = req.params;

    const company = await Company.findById(companyId);
    if (!company)
      return res.status(404).json({ message: "Company not found" });

    const accounts = await Account.find({ company: companyId }).populate(
      "yearlyBalances.financialYear"
    );

    res.status(200).json({
      message: "Accounts fetched successfully",
      accounts,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching accounts",
      error: error.message,
    });
  }
};

// Get single account (ensure it belongs to company)
exports.getAccount = async (req, res) => {
  try {
    const { companyId, accountId } = req.params;

    const account = await Account.findOne({
      _id: accountId,
      company: companyId,
    }).populate("yearlyBalances.financialYear");

    if (!account)
      return res
        .status(404)
        .json({ message: "Account not found for this company" });

    res.status(200).json({
      message: "Account fetched successfully",
      account,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching account",
      error: error.message,
    });
  }
};

// Add single account to a company
exports.addAccount = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { accountName, accountType, category, subCategory, yearlyBalances } =
      req.body;

    if (!accountName || !accountType || !category || !subCategory)
      return res.status(400).json({ message: "Missing required fields" });

    const company = await Company.findById(companyId);
    if (!company)
      return res.status(404).json({ message: "Company not found" });

    const account = await Account.create({
      accountName,
      accountType,
      category,
      subCategory,
      yearlyBalances,
      company: companyId,
    });

    res.status(201).json({
      message: "Account created successfully",
      account,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating account",
      error: error.message,
    });
  }
};

// Add multiple accounts (bulk) for a company
exports.addAccounts = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { accounts } = req.body;

    if (!Array.isArray(accounts) || accounts.length === 0)
      return res.status(400).json({ message: "Accounts array is required" });

    const company = await Company.findById(companyId);
    if (!company)
      return res.status(404).json({ message: "Company not found" });

    const accountsWithCompany = accounts.map((acc) => ({
      ...acc,
      company: companyId,
    }));

    const createdAccounts = await Account.insertMany(accountsWithCompany);

    res.status(201).json({
      message: "Accounts added successfully",
      accounts: createdAccounts,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error adding accounts",
      error: error.message,
    });
  }
};

// Rename account
exports.renameAccount = async (req, res) => {
  try {
    const { companyId, accountId } = req.params;
    const { accountName } = req.body;

    if (!accountName)
      return res.status(400).json({ message: "New account name is required" });

    const account = await Account.findOne({
      _id: accountId,
      company: companyId,
    });

    if (!account)
      return res
        .status(404)
        .json({ message: "Account not found for this company" });

    account.accountName = accountName;
    await account.save();

    res.status(200).json({ message: "Account renamed successfully", account });
  
} catch (error) {
    res.status(500).json({
      message: "Error renaming account",
      error: error.message,
    });
  }
};

// // Update account balance
// exports.updateAccountBalance = async (req, res) => {
//   try {
//     const { companyId, accountId } = req.params;
//     const { financialYear, balance } = req.body;

//     const account = await Account.findOne({
//       _id: accountId,
//       company: companyId,
//     }).populate("yearlyBalances.financialYear");

//     if (!account)
//       return res
//         .status(404)
//         .json({ message: "Account not found for this company" });

//     const yearIndex = account.yearlyBalances.findIndex(
//       (b) => b.financialYear.name.toString() === financialYear
//     );

//     if (yearIndex === -1)
//       return res
//         .status(404)
//         .json({ message: "Financial year not found in account" });

//     account.yearlyBalances[yearIndex].balance = balance;
//     account.yearlyBalances[yearIndex].closingBalance = balance;
//     await account.save();

//     res.status(200).json({ message: "Balance updated successfully", account });

//   } catch (error) {
//     res.status(500).json({
//       message: "Error updating balance",
//       error: error.message,
//     });
//   }
// };

// Delete account (must belong to company)
exports.deleteAccount = async (req, res) => {
  try {
    const { companyId, accountId } = req.params;

    const account = await Account.findOneAndDelete({
      _id: accountId,
      company: companyId,
    });

    if (!account)
      return res
        .status(404)
        .json({ message: "Account not found for this company" });

    res.status(200).json({ message: "Account deleted successfully" });
  
} catch (error) {
    res.status(500).json({
      message: "Error deleting account",
      error: error.message,
    });
  }
};
