import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    refreshToken: {
        type: String,
        default: null
    }
}, {
    timestamps: true,
    collection: 'register'
});

export const Register = mongoose.model("Register", registerSchema);
