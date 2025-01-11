const express = require('express');
const bcrypt = require('bcryptjs'); // For hashing the password
const User = require('../models/User'); // User model to interact with the database

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        // Send success response
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error("Signup Error:", error);  // Log the error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


module.exports = router;
