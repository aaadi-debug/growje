const bcrypt = require("bcryptjs");

const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// Register admin
const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "admin",
        });

        res.status(201).json({
            success: true,
            message: "Admin registered successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Login admin
const loginAdmin = async (req, res) => {
    try {
        console.log("======= LOGIN ATTEMPT =======");
        console.log("Origin:", req.headers.origin);
        console.log("Body:", req.body);

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = generateToken(user._id);
        console.log("Token generated successfully");

        // res.cookie("token", token, {
        //   httpOnly: true,
        //   secure: process.env.NODE_ENV === "production",
        //   sameSite: "lax",
        //   maxAge: 7 * 24 * 60 * 60 * 1000,
        // });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            // secure: false,
            // sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        console.log("Cookie set with sameSite: none");

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,                       // ← add this
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Logout Admin
const logoutAdmin = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        secure: true,
        sameSite: "none",
        // sameSite: "lax",
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};

module.exports = {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
};