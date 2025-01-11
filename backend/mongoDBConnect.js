const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://mahmad92001:qXkCXogVrtx2aiNU@personal.btfyp.mongodb.net/myTodo', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected to myTodo database');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit if the connection fails
    }
};

module.exports = connectToDatabase;
