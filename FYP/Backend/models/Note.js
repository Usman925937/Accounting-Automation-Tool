const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        noteNumber: {
            type: Number,
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        linkedAccount: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
            default: null,
        },

        financialStatement: {
            type: String,
            enum: ["balance", "pnl", "ci", "equity", "cashflow"],
            required: true,
        },

        financialYear: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FinancialYear",
            required: true,
        },
    },
    { timestamps: true }
);

// Ensure each note number is unique within a financial year
noteSchema.index({ financialYear: 1, noteNumber: 1 }, { unique: true });

// Optional helper: get next available note number
noteSchema.statics.getNextNoteNumber = async function (financialYear) {
    const lastNote = await this.findOne({ financialYear })
        .sort({ noteNumber: -1 })
        .lean();
    return lastNote ? lastNote.noteNumber + 1 : 1;
};

module.exports = mongoose.model("Note", noteSchema);
