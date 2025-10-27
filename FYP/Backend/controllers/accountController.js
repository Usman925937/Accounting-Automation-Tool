const Account = require("../models/Account");
const Company = require("../models/Company");
const defaultAccounts = require("../data/defaultAccounts");

// Get all accounts for a specific company
exports.getAccounts = async (req, res) => {
  try {
    const { companyId } = req.params;

    const company = await Company.findById(companyId);
    if (!company)
      return res.status(404).json({ message: "Company not found" });

    const accounts = await Account.find({ company: companyId });

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
    });

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
    const { accountName, accountType, financialStatement, category, subCategory, yearlyBalances } =
      req.body;

    if (!accountName || !accountType || !category || !subCategory)
      return res.status(400).json({ message: "Missing required fields" });

    const company = await Company.findById(companyId);
    if (!company)
      return res.status(404).json({ message: "Company not found" });

    const account = await Account.create({
      accountName,
      accountType,
      financialStatement,
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

// Create default accounts
exports.addAccounts = async (req, res) => {
  try {
    // find company
    const company = await Company.findById(req.params.companyId);

    // Filter default accounts based on business type and finance type
    const filteredAccounts = defaultAccounts.filter(acc => {
      const businessMatch =
        acc.businessType === "hybrid" || acc.businessType === company.businessType;
      const financeMatch =
        acc.financeType === "hybrid" || acc.financeType === company.financeType;
      return businessMatch && financeMatch;
    });

    // Generate default accounts for this company
    const accountsWithCompany = filteredAccounts.map(acc => ({
      ...acc,
      company: company._id
    }));

    await Account.insertMany(accountsWithCompany);

    res.status(201).json({
      message: "Successfully added default accounts",
      company,
      accounts: accountsWithCompany
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding accounts", error: error.message });
  }
};

// edit account
exports.editAccount = async (req, res) => {
  try {
    const { companyId, accountId } = req.params;
    const { accountName, accountType, category, subCategory, financialStatement } = req.body;

    if (!accountName || !accountType || !category || !subCategory || !financialStatement)
      return res.status(400).json({ message: "Missing required fields" });

    const account = await Account.findOne({
      _id: accountId,
      company: companyId,
    });

    if (!account)
      return res
        .status(404)
        .json({ message: "Account not found for this company" });

    account.accountName = accountName;
    account.accountType = accountType;
    account.category = category;
    account.subCategory = subCategory;
    account.financialStatement = financialStatement;
    await account.save();

    const accounts = await Account.find({ company: companyId });

    res.status(200).json({ message: "Account renamed successfully", accounts });
  
} catch (error) {
    res.status(500).json({
      message: "Error renaming account",
      error: error.message,
    });
  }
};

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

// Delete all accounts (must belong to company)
exports.deleteAllAccounts = async (req, res) => {
  try {
    const { companyId } = req.params;

    const accounts = await Account.deleteMany({
      company: companyId,
    });

    if (!accounts)
      return res
        .status(404)
        .json({ message: "Accounts not found for this company" });

    res.status(200).json({ message: "Accounts deleted successfully" });
  
} catch (error) {
    res.status(500).json({
      message: "Error deleting accounts",
      error: error.message,
    });
  }
};
