const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Import the User model
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Environment variable for JWT secret
const JWT_SECRET = 'your_secret_key_here'; // Set your JWT secret key here

// Connect to MongoDB Atlas
mongoose
    .connect('mongodb+srv://mahmad92001:qXkCXogVrtx2aiNU@personal.btfyp.mongodb.net/myTodo?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB Connection Error:', err));

// Signup route
app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body; // Extract email and password

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Login route
app.post('/api/login', async (req, res) => {
    console.log('Login attempt received');
    console.log('Request Body:', req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find the user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare hashed passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id }, // Payload
            JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Token expiration time
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Protected route example
app.get('/api/protected', (req, res) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        res.status(200).json({ message: 'Access granted', user: req.user });
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://192.168.12.1:${PORT}`));
