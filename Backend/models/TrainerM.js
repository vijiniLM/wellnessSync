const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({

    // Trainer's Information
    full_name: {
        type: String,
        required: true
    },

    specialization: {
        type: String
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address']
    },

    phone_number: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please fill a valid phone number']
    },

    // Trainer's age
    age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },

    address: {
        type: String,
        required: true
    },

    // Profile picture URL or path
    profilePicture: {
        type: String
    }

}, { timestamps: true }); 

module.exports = mongoose.model('TrainerM', trainerSchema);
