const mongoose = require("mongoose");

const WorkoutPlanSchema = new mongoose.Schema(
{   
    trainerid: {
      type: String,
      ref: "User",
   
    },

    title: { 
      type: String, 
      required: true 
    },

    description: String,

    difficulty: { 
      type: String, 
      enum: ["Beginner", "Intermediate", "Advanced"], 
      required: true 
    },


    exercises: [
        {
            name: String,
            sets: Number,
            reps: Number,
            duration: String
        }
    ],

    // userId: { 
    //   type: String, 
    //   ref: "User" 
    // }, // Assuming users are stored
    
    createdAt: {
      type: Date,
      default: Date.now
    },
}, 

{ timestamps: true });

module.exports = mongoose.model("WorkoutPlanM", WorkoutPlanSchema);
