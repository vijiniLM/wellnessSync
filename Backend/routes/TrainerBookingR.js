const express = require('express');
const BookPersonalTrainer= require('../models/TrainerBookingM');
const TrainerBookingM = require('../models/TrainerBookingM');
const router = express.Router();

// create a new trainer booking

router.post('/book/save', (req, res) => {
    let newBooking = new BookPersonalTrainer(req.body);

    newBooking.save()
        .then(() => {
            return res.status(200).json({
                success: "Personal Trainer Booking successfully saved"
            });
        })
        .catch(err => {
            return res.status(400).json({
                error: err.message
            });
        });
});

// Route to get all trainer bookings

router.get('/bookings', async (req, res) => {
    try {
        const bookings = await BookPersonalTrainer.find();
        res.status(200).json(bookings);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Route to get trainer bookings trainerId

router.get("/bookings/tid/:trainerid", (req, res) => {
    let tId = req.params.trainerid;

    BookPersonalTrainer.find({ trainerid: tId })
        .then(BookPersonalTrainer => {
            return res.status(200).json({
                success: true,
                BookPersonalTrainer: BookPersonalTrainer
            });
        })
        .catch(err => {
            return res.status(400).json({ success: false, error: err });
        });
});

// // Route to get bookings by User ID

    router.get("/bookings/uid/:userid", (req, res) => {
        let uId = req.params.userid;
    
        BookPersonalTrainer.find({ userid: uId })
            .then(BookPersonalTrainer => {
                return res.status(200).json({
                    success: true,
                    BookPersonalTrainer: BookPersonalTrainer
                });
            })
            .catch(err => {
                return res.status(400).json({ success: false, error: err });
            });
    });

// Route to update a booking (status or payment)

router.put('/book/update/:id', async (req, res) => {
    try {
        const updatedBooking = await BookPersonalTrainer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({ success: "Booking updated successfully", updatedBooking });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Route to delete a booking

router.delete('/book/delete/:id', async (req, res) => {
    try {
        await BookPersonalTrainer.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: "Booking deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Route to get available slots for a trainer
router.get('/bookings/available-slots/:trainerid', async (req, res) => {
    try {
        const trainerId = req.params.trainerid;

        // Fetch all bookings for the given trainer and extract available slots
        const trainerBookings = await BookPersonalTrainer.find({ trainerid: trainerId });

        let availableSlots = [];

        // Collect all unique available slots for this trainer (assuming each booking has an 'availableSlots' field)
        trainerBookings.forEach(booking => {
            if (booking.availableSlots && !availableSlots.includes(booking.availableSlots)) {
                availableSlots.push(booking.availableSlots);
            }
        });

        res.status(200).json({
            success: true,
            availableSlots: availableSlots
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

module.exports = router;