const express = require("express");

const {
    register,
    login,
    logout
} = require("../controllers/authController");

const router = express.Router();

//local
router.post('/register', register);
router.post('/login', login);

//logout
router.post('/logout', logout);

module.exports = router;