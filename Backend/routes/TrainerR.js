const express = require("express");
const TrainerM = require("../models/TrainerM");

const router = express.Router();

router.post('/trainer/save', (req, res) => {
    let newTrainer = new TrainerM(req.body);

    newTrainer.save()
        .then(() => {
            return res.status(200).json({
                success: "Personal Trainer Added successfully "
            });
        })
        .catch(err => {
            return res.status(400).json({
                error: err.message
            });
        });
});

// Get all Trainers


//   router.get('/trainer/view', async (req, res) => {
//       try {
//           const trainers = await TrainerM.find();
//           res.status(200).json(trainers);
//       } catch (err) {
//           res.status(400).json({ error: err.message });
//       }
//   });

router.get('/trainer/view', (req, res) => {
    TrainerM.find().exec()
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
  
  //Get a specific Trainer
  
  router.get("getTrainer/:id", async (req, res) => {
    try {
      const trainer = await TrainerM.findById(req.params.id).populate("assignedPlans");
      if (!trainer) return res.status(404).json({ message: "Trainer Not Found" });
      res.json(trainer);
    } 
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


  
  module.exports = router;