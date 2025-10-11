const express = require("express");

const {
    getAccount,
    getAccounts,
    addAccount,
    addAccounts,
    renameAccount,
    updateAccountBalance,
    deleteAccount
} = require("../controllers/accountController");

const router = express.Router();

// routes
// All routes are company-scoped
router.get("/", getAccounts);
router.post("/", addAccount);
router.post("/bulk", addAccounts);

// Single account operations
router.get("/:accountId", getAccount);
router.put("/:accountId/rename", renameAccount);
// router.put("/:accountId/balance", updateAccountBalance);
router.delete("/:accountId", deleteAccount);

module.exports = router;