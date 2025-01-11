const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/login'); // User model for interacting with the database
const authMiddleware = require('../middleware/authMiddleware'); // Import the authentication middleware
const router = express.Router();

// POST request for login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password.' });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id }, // Payload
      process.env.JWT_SECRET, // Secret key from .env
      { expiresIn: '1h' } // Token expiration time
    );

    // Login successful, send token
    res.json({ message: 'Login successful', token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected route example
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({
    message: 'This is a protected route. You are authenticated!',
    user: req.user, // This comes from authMiddleware
  });
});

module.exports = router;
