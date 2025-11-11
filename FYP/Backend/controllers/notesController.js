const Note = require("../models/Note");
const Account = require("../models/Account");
const FinancialYear = require("../models/FinancialYear");

// ------------------ CREATE A NEW NOTE ------------------
exports.createNote = async (req, res) => {
  try {
    const {
      title,
      description,
      linkedAccount,
      financialStatement,
      financialYear,
    } = req.body;

    const userCompanyId = req.user.company; 
    
    if (!title || !financialStatement || !financialYear) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Verify that the financial year exists and belongs to the same company
    const fy = await FinancialYear.findOne({
      _id: financialYear,
      companyId: userCompanyId,
    });

    if (!fy) {
      return res
        .status(403)
        .json({ message: "You do not have access to this financial year" });
    }

    // Get next available note number for this year
    const noteNumber = await Note.getNextNoteNumber(financialYear);

    const note = await Note.create({
      noteNumber,
      title,
      description,
      linkedAccount: linkedAccount || null,
      financialStatement,
      financialYear,
    });

    res.status(201).json({ message: "Note created successfully", note });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Error creating note" });
  }
};

// ------------------ GET ALL NOTES ------------------
exports.getNotes = async (req, res) => {
  try {
    const { financialYear } = req.query;
    const userCompanyId = req.user.company;

    // Ensure the year belongs to the user's company
    const fy = await FinancialYear.findOne({
      _id: financialYear,
      companyId: userCompanyId,
    });

    if (!fy) {
      return res
        .status(403)
        .json({ message: "You do not have access to this financial year" });
    }

    const notes = await Note.find({ financialYear })
      .populate("linkedAccount", "accountName")
      .sort({ noteNumber: 1 });

    res.status(200).json({ notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Error fetching notes" });
  }
};

// ------------------ GET SINGLE NOTE BY ID ------------------
exports.getNoteById = async (req, res) => {
  try {
    const userCompanyId = req.user.company;

    const note = await Note.findById(req.params.id)
      .populate("linkedAccount", "accountName");

    if (!note) return res.status(404).json({ message: "Note not found" });

    // Check company access via the linked financial year
    const fy = await FinancialYear.findOne({
      _id: note.financialYear,
      companyId: userCompanyId,
    });
    if (!fy)
      return res
        .status(403)
        .json({ message: "You do not have access to this note" });

    res.status(200).json({ note });
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ message: "Error fetching note" });
  }
};

// ------------------ UPDATE A NOTE ------------------
exports.updateNote = async (req, res) => {
  try {
    const { title, description, linkedAccount, financialStatement } = req.body;
    const userCompanyId = req.user.company;

    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    // Verify company ownership through financial year
    const fy = await FinancialYear.findOne({
      _id: note.financialYear,
      companyId: userCompanyId,
    });
    if (!fy)
      return res
        .status(403)
        .json({ message: "You do not have access to this note" });

    note.title = title ?? note.title;
    note.description = description ?? note.description;
    note.linkedAccount = linkedAccount || null;
    note.financialStatement = financialStatement ?? note.financialStatement;

    await note.save();

    res.status(200).json({ note });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Error updating note" });
  }
};

// ------------------ DELETE A NOTE ------------------
exports.deleteNote = async (req, res) => {
  try {
    const userCompanyId = req.user.company;

    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    const fy = await FinancialYear.findOne({
      _id: note.financialYear,
      companyId: userCompanyId,
    });
    if (!fy)
      return res
        .status(403)
        .json({ message: "You do not have access to this note" });

    await note.deleteOne();

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Error deleting note" });
  }
};

// ------------------ UNLINK A NOTE FROM ACCOUNT ------------------
exports.unlinkNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userCompanyId = req.user.company;

    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    const fy = await FinancialYear.findOne({
      _id: note.financialYear,
      companyId: userCompanyId,
    });
    if (!fy)
      return res
        .status(403)
        .json({ message: "You do not have access to this note" });

    note.linkedAccount = null;
    await note.save();

    res.status(200).json({ message: "Note unlinked successfully", note });
  } catch (error) {
    console.error("Error unlinking note:", error);
    res.status(500).json({ message: "Error unlinking note" });
  }
};
