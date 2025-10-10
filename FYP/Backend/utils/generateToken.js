const jwt = require("jsonwebtoken");
require('dotenv').config();

const genToken = (id) => {
    return jwt.sign({ id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
)
}

module.exports = { genToken };