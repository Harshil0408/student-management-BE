import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Register } from "../models/register.model.js";
import { JWT_SECRET, JWT_REFRESH_SECRET, JWT_OPTIONS } from "../config/jwt.config.js";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await Register.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const existingUsername = await Register.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Register.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: 'User created successfully',
            success: true,
            user: {
                username: user.username,
                email: user.email,
                _id: user._id
            }
        });
    } catch (error) {
        console.log('Error in register controller:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Register.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const accessToken = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            JWT_OPTIONS.accessToken
        );

        const refreshToken = jwt.sign(
            { userId: user._id },
            JWT_REFRESH_SECRET,
            JWT_OPTIONS.refreshToken
        );

        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({
            message: 'Login successful',
            success: true,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            },
            accessToken,
            refreshToken
        });

    } catch (error) {
        console.log('Error in login controller:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token is required' });
        }

        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

        const user = await Register.findById(decoded.userId);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        const accessToken = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            JWT_OPTIONS.accessToken
        );

        res.status(200).json({
            accessToken
        });

    } catch (error) {
        console.log('Error in refresh token controller:', error);
        res.status(401).json({ message: 'Invalid refresh token' });
    }
};

export const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        const user = await Register.findOneAndUpdate(
            { refreshToken },
            { refreshToken: null },
            { new: true }
        );

        if (!user) {
            return res.status(200).json({ message: 'Logged out successfully' });
        }

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log('Error in logout controller:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}; 