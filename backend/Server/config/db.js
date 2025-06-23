
const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/contactApp');
        console.log('MongoDB Connected!');
    } catch (error) {
        console.error(`Database Error: ${error.message}`);
    }
};
module.exports = connectDB;
