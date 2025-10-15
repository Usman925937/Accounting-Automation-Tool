const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'accountant'],
        default: 'accountant'
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    company: {
        type: mongoose.Types.ObjectId,
        ref: "Company",
        required: true
    }
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);
module.exports = User;