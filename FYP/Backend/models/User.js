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
        enum: ['admin', 'accountant', 'manager'],
        default: 'user'
    },
    company: {
        type: mongoose.Types.ObjectId,
        ref: "Company"
    }
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);
module.exports = User;