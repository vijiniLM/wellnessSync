const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Get all users

// router.get("/userAll/get", async (req, res) => {
//     try {
//       const users = await User.find().populate("assignedPlans");
//       res.json(users);
//     } 
//     catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
  
//   // Get a specific user

//   router.get("UserGet/:id", async (req, res) => {
//     try {
//       const user = await User.findById(req.params.id).populate("assignedPlans");
//       if (!user) return res.status(404).json({ message: "User not found" });
//       res.json(user);
//     } 
//     catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
  
  module.exports = router;