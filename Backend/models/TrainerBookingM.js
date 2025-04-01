const mongoose = require('mongoose');
const TrainerBookingSchema = new mongoose.Schema(
{

    userid:{
        type:String,
        required:true
    },

    trainerid:{
        type:String,
        required:true
    },

    date: {
        type: String, // Storing date as YYYY-MM-DD
        required: true,
    },

    time: {
        type: String, // Storing time as HH:MM (24-hour format)
        required: true,
    },

    tbmessage: {
        type: String, 
        required: true,
    },
    assignedPlans: [{ 
        type: String, 
        ref: 'WorkoutPlan' 
    }],
      
    paymentStatus: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending",
      
    }, 
    
    availableSlots: {
        type: String
    },
    age: {
        type: String, // Storing time as HH:MM (24-hour format)
        required: true,
    },
    gender: {
        type: String,
        required: true,

      
    }, 
    

},

{ timestamps: true }
   
);




module.exports = mongoose.model('TrainerBookingM',TrainerBookingSchema);