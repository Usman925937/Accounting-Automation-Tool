const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const isApprovedMiddleware = require("../middleware/isApprovedMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getBudgets,
  getBudget,
  createBudget,
  updateBudget,
  deleteBudget,
  deleteAllBudgets,
} = require("../controllers/budgetController");

router.get("/", authMiddleware, isApprovedMiddleware, getBudgets);
router.get("/current", authMiddleware, isApprovedMiddleware, getBudget);
router.post("/", authMiddleware, adminMiddleware, createBudget);
router.put("", authMiddleware, adminMiddleware, updateBudget);
router.delete("/:budgetId", authMiddleware, adminMiddleware, deleteBudget);

module.exports = router;
