const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// REGISTER API
router.post("/register", async (req, res) => {

    try {

        const { username, email, password } = req.body;

        // Check empty fields
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check password length
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        // Check whether email already exists
        const existingUser = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username,
            email: email.trim().toLowerCase(),
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "Registration successful"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

});


// LOGIN API
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check empty fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user in database
        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token: token
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

});

const authMiddleware = require("../middlewares/authMiddleware");

// PROTECTED ROUTE
router.get("/dashboard", authMiddleware, async (req, res) => {

    try {

        const user = await User.findById(req.userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "Welcome to your dashboard",
            user: user
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

});


module.exports = router;