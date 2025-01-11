const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create and export the model
const User = mongoose.model('User', userSchema, 'users');
module.exports = User;
