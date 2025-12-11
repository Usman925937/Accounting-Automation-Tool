const express = require("express");

const {
    initialSetup
} = require("../controllers/initialSetupController");

const router = express.Router();

router.get('/', initialSetup);

module.exports = router;