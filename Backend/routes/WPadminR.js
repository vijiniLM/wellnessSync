const express = require("express");
const WPAdminMAdmin = require("../models/WPAdminM");
const WorkoutPlan = require("../models/WorkoutPlanM");

const router = express.Router();

// Admin Dashboard
router.get("/dashboard", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTrainers = await Trainer.countDocuments();
    const totalPlans = await WorkoutPlan.countDocuments();
    res.json({ totalUsers, totalTrainers, totalPlans });
  } 
  
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Approve workout plan
router.post("/approve-plan/:id", async (req, res) => {
  try {
    const plan = await WorkoutPlan.findByIdAndUpdate(req.params.id, { status: "Approved" }, { new: true });
    res.json(plan);
  } 
  
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;