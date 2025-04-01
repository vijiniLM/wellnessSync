const express = require("express");
const router = express.Router();
const UserProgress = require("../models/UserProgressM");

// Log Workout Progress for a user
router.post("/log-progress", async (req, res) => {
  try {
    const { traineeId, workoutPlanId, completedExercises, progressPercentage } = req.body;

    let progress = await TraineeProgress.findOne({ traineeId, workoutPlanId });

    if (!progress) {
      progress = new TraineeProgress({
        traineeId,
        workoutPlanId,
        completedExercises,
        progressPercentage,
        completionStatus: progressPercentage === 100 ? "Completed" : "In Progress",
      });
    } else {
      progress.completedExercises = completedExercises;
      progress.progressPercentage = progressPercentage;
      progress.completionStatus = progressPercentage === 100 ? "Completed" : "In Progress";
    }

    await progress.save();
    res.status(201).json({ message: "Progress Logged Successfully!", progress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Progress for a Specific user
router.get("/:traineeId", async (req, res) => {
  try {
    const progress = await TraineeProgress.find({ traineeId: req.params.traineeId })
      .populate("workoutPlanId", "name duration");
    
    if (!progress || progress.length === 0) {
      return res.status(404).json({ message: "No progress found for this trainee" });
    }

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Progress for a Specific Workout Plan
router.get("/plan/:workoutPlanId", async (req, res) => {
  try {
    const progress = await TraineeProgress.find({ workoutPlanId: req.params.workoutPlanId })
      .populate("traineeId", "name email");
    
    if (!progress || progress.length === 0) {
      return res.status(404).json({ message: "No progress found for this workout plan" });
    }

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update 
router.put("/update/:progressId", async (req, res) => {
  try {
    const { completedExercises, progressPercentage } = req.body;

    const progress = await TraineeProgress.findByIdAndUpdate(
      req.params.progressId,
      {
        completedExercises,
        progressPercentage,
        completionStatus: progressPercentage === 100 ? "Completed" : "In Progress",
      },
      { new: true }
    );

    if (!progress) {
      return res.status(404).json({ message: "Progress record not found" });
    }

    res.status(200).json({ message: "Progress Updated Successfully!", progress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete 
router.delete("/delete/:progressId", async (req, res) => {
  try {
    await TraineeProgress.findByIdAndDelete(req.params.progressId);
    res.status(200).json({ message: "Progress Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
