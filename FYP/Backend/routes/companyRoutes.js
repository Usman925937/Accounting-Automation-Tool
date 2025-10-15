const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const isApprovedMiddleware = require("../middleware/isApprovedMiddleware");

const {
    createCompany,
    getCompany,
    updateCompany,
    deleteCompany
} = require("../controllers/companyController");

const router = express.Router();

// routes
router.get("/:id", authMiddleware, isApprovedMiddleware, getCompany);
router.post("/", createCompany);
router.put("/:id", authMiddleware, adminMiddleware, updateCompany);
router.delete("/:id", authMiddleware, adminMiddleware, deleteCompany);

module.exports = router;