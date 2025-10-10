const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Error: ", error.message);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
}

module.exports = authMiddleware;