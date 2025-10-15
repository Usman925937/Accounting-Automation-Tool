const User = require('../models/User');
const Company = require('../models/Company');

//get me
exports.getMe = async (req, res) => {

    // find company
    const company = await Company.findOne({ _id: req.user.company });
    if (!company) {
        return res.status(404).json({ message: "No such company exists" });
    }

    res.status(200).json({
        message: "User fetched successfully",
        user: {
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
            company,
            isApproved: req.user.isApproved
        }
    });
}

//get one user
exports.getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (req.user.company !== user.company) {
            return res.status(403).json({ message: "Unauthorized to fetch this user" });
        }

        res.status(200).json({
            message: "User fetched successfully",
            user
        });

    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

//get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'accountant', company: req.user.company })
            .select("-password");

        if (!users) {
            return res.status(404).json({ message: "No users found", users });
        }

        res.status(200).json({ message: "Users fetched successfully", users });

    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

// approve accountant
exports.approveAccountant = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (req.user.company.toString() !== user.company.toString()) {
            return res.status(403).json({ message: "Unauthorized to approve this user" });
        }

        user.isApproved = true;
        await user.save();

        res.status(200).json({ message: "Accountant approved successfully", user });

    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

//delete user
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    if (req.user.role !== 'admin' && req.user.id !== id) {
        return res.status(403).json({ message: "Unauthorized to delete this user" });
    }

    try {
        const user = await User.findByIdAndDelete(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (req.user.company !== user.company) {
            return res.status(403).json({ message: "Unauthorized to delete this user" });
        }

        res.status(204).json({ message: "User deleted successfully" });

    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).json({ message: 'Server Error' });
    }
}