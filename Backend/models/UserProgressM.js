const mongoose = require("mongoose");
const UserProgressSchema = new mongoose.Schema({

  traineeId: { type: String, 
    ref: "User", 
    required: true },

  workoutPlanId: { 
    type: String, 
    ref: "WorkoutPlan", 
    required: true 
},

  completionStatus: { 
    type: String, 
    enum: ["Pending", "In Progress", "Completed"], default: "Pending" 
},

  progressPercentage: { 
    type: Number, 
    default: 0 
},

  completedExercises: [{ type: String }],

  createdAt: { 
    type: Date, 
    default: Date.now 
},
});

module.exports = mongoose.model("UserProgressM", UserProgressSchema);
