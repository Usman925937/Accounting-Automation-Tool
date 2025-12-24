const bcyrpt = require('bcryptjs');
const User = require('../models/User');
const Company = require('../models/Company');
const { genToken } = require('../utils/generateToken');

//register
exports.register = async (req, res) => {
    try {
        const { name, email, password, role, companyName } = req.body;
        
        // find user
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // find company
        const company = await Company.findOne({ companyName: companyName });
        if (!company) {
            return res.status(404).json({ message: "No such company exists" });
        }

        // hash password
        const hashedPassword = await bcyrpt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'accountant',
            company: company._id,
            isApproved: role === 'admin' ? true : false
        });

        const token = genToken(newUser.id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        }).status(201).json({
            message: 'User created successfully',
            user: {
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                company,
                isApproved: newUser.isApproved
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).populate('company');
        if (!user) {
            return res.status(404).json({ message: 'Invalid credentials' });
        }

        const isMatch = bcyrpt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        }).status(200).json({
            message: 'Logged in successfully',
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                company: user.company,
                isApproved: user.isApproved
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none'
    });

    res.status(200).json({ message: 'Logged out successfully' });
}