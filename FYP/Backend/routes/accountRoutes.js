const express = require("express");
const adminMiddleware = require('../middleware/adminMiddleware');

const {
    getAccount,
    getAccounts,
    addAccount,
    addAccounts,
    editAccount,
    deleteAccount,
    deleteAllAccounts
} = require("../controllers/accountController");

const router = express.Router({ mergeParams: true });

// routes
// All routes are company-scoped
router.get("/", getAccounts);
router.post("/", addAccount);
router.post("/bulk", addAccounts);

// Single account operations
router.get("/:accountId", getAccount);
router.put("/:accountId/edit", adminMiddleware, editAccount);
router.delete("/:accountId", adminMiddleware, deleteAccount);
//router.delete("/", deleteAllAccounts);

module.exports = router;