const express = require("express");
const WorkoutPlan = require("../models/WorkoutPlanM");

const router = express.Router();

//Create a new workout plan
router.post("/Create/workoutplan", async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Debug request body
        const newPlan = new WorkoutPlan(req.body);
        await newPlan.save();
        res.status(201).json(newPlan);
    } 
    catch (error) {
        console.error("Error saving workout plan:", error); // Log actual error
        res.status(500).json({ message: error.message });
    }
});


//Get all workout plans
// router.get("/GetAllWorkout", async (req, res) => {
//     try {
//         const plans = await WorkoutPlan.find();
//         res.status(200).json(plans);
//     } 
//     catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
router.get('/GetAllWorkout/view', (req, res) => {
    WorkoutPlan.find().exec()
        .then(trainerM => {
            return res.status(200).json({
                success: true,
                existingProject: trainerM
            });
        })
        .catch(err => {
            return res.status(400).json({
                error: err
            });
        });
});

//Get a single workout plan by ID
router.get("GetWorkout/:id", async (req, res) => {
    try {
        const plan = await WorkoutPlan.findById(req.params.id);
        if (!plan) return res.status(404).json({ message: "Workout Plan not found" });
        res.status(200).json(plan);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Update a workout plan by ID
router.put("UpdateWorkout/:id", async (req, res) => {
    try {
        const updatedPlan = await WorkoutPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPlan) return res.status(404).json({ message: "Workout Plan not found" });
        res.status(200).json(updatedPlan);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Delete a workout plan by ID
// router.delete("workoutDelete/:id", async (req, res) => {
//     try {
//         const deletedPlan = await WorkoutPlan.findByIdAndDelete(req.params.id);
//         if (!deletedPlan) return res.status(404).json({ message: "Workout Plan not found" });
//         res.status(200).json({ message: "Workout Plan deleted successfully" });
//     } 
//     catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
router.delete('/workoutDelete/:id', (req, res) => {
    WorkoutPlan.findByIdAndDelete(req.params.id)
        .then(deletedProject => {
            if (!deletedProject) {
                return res.status(404).json({ message: "Delete unsuccessful - Workout Plan not found" });
            }
            return res.json({ message: "Delete successful", deletedProject });
        })
        .catch(err => {
            return res.status(400).json({ message: "Delete unsuccessful", error: err });
        });
});

module.exports = router;