const Company = require("../models/Company");
const Account = require("../models/Account");
const defaultAccounts = require("../data/defaultAccounts");

// Create a new company + its default accounts
exports.createCompany = async (req, res) => {
  try {
    const { companyName, email, industry, address, code, type } = req.body;

    // Create the company
    const company = await Company.create({
      companyName,
      email,
      industry,
      address,
      code,
      type
    });

    // Generate default accounts for this company
    const accountsWithCompany = defaultAccounts.map(acc => ({
      ...acc,
      company: company._id
    }));

    await Account.insertMany(accountsWithCompany);

    res.status(201).json({
      message: "Company created successfully with default accounts",
      company
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating company", error: error.message });
  }
};

// Get a single company and its accounts
exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });

    res.status(200).json({ company });
    
  } catch (error) {
    res.status(500).json({ message: "Error fetching company", error: error.message });
  }
};

// Update company details
exports.updateCompany = async (req, res) => {
  try {
    const updated = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Company not found" });

    res.status(200).json({ message: "Company updated successfully", company: updated });

  } catch (error) {
    res.status(500).json({ message: "Error updating company", error: error.message });
  }
};

// Delete a company and all its accounts
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });

    // Delete accounts related to the company
    await Account.deleteMany({ company: company._id });
    await company.deleteOne();

    res.status(200).json({ message: "Company and related accounts deleted successfully" });
    
  } catch (error) {
    res.status(500).json({ message: "Error deleting company", error: error.message });
  }
};
