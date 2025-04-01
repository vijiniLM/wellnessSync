const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    full_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address']
    },

    password_hash: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },

    height: {
        type: Number,
        required: true
    },

    weight: {
        type: Number,
        required: true
    },

    fitness_goal: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },
    
    phone_number: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please fill a valid phone number']
    }
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;