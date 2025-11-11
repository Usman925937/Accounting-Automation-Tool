const express = require("express");
const router = express.Router();
const {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote,
    unlinkNote
} = require("../controllers/notesController");

const authMiddleware = require('../middleware/authMiddleware');
const isApprovedMiddleware = require('../middleware/isApprovedMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post("/", authMiddleware, isApprovedMiddleware, createNote);
router.get("/", authMiddleware, isApprovedMiddleware, getNotes);
router.get("/:id", authMiddleware, isApprovedMiddleware, getNoteById);
router.put("/:id", authMiddleware, isApprovedMiddleware, updateNote);
router.delete("/:id",  authMiddleware, adminMiddleware, deleteNote);
router.put("/unlink/:id", authMiddleware, isApprovedMiddleware, unlinkNote);

module.exports = router;
