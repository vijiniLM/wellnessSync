console.log("Ingredient Router is being loaded");
const mongoose = require("mongoose");
const router = require("express").Router();
let Ingredient = require("../models/ingredient");

console.log("Ingredient model:", Ingredient); //DEBUG

// **Route to add a new ingredient**
router.route("/add").post(async (req, res) => {
    console.log("Received Data:", req.body);

    try {
        console.log("Received Data:", req.body);

        const {
            name,
            price,
            category,
            macronutrients = {},
            micronutrients = {},
            expiryDate,
            storageCondition,
            measurement
        } = req.body;

        // Convert numerical values
        const calories = Number(macronutrients.calories) || 0;
        const protein = Number(macronutrients.protein) || 0;
        const carbohydrates = Number(macronutrients.carbohydrates) || 0;
        const fats = Number(macronutrients.fats) || 0;
        const fiber = Number(micronutrients.fiber) || 0;
        const sugar = Number(micronutrients.sugar) || 0;
        const sodium = Number(micronutrients.sodium) || 0;
        const parsedPrice = Number(price);

        // Validate expiryDate
        const parsedExpiryDate = new Date(expiryDate);
        if (isNaN(parsedExpiryDate.getTime())) {
            return res.status(400).json({ error: "Expiry Date must be a valid date." });
        }

        // Check for invalid numbers
        if ([calories, protein, carbohydrates, fats, fiber, sugar, sodium, parsedPrice].some(isNaN)) {
            return res.status(400).json({ error: "All numerical fields must be valid numbers." });
        }

        const newIngredient = new Ingredient({
            name,
            price: parsedPrice,
            category,
            macronutrients: { calories, protein, carbohydrates, fats },
            micronutrients: { fiber, sugar, sodium },
            expiryDate: parsedExpiryDate,
            storageCondition,
            measurement
        });

        console.log("Data to be saved:", newIngredient);

        await newIngredient.save();

        console.log("Ingredient saved successfully:", newIngredient); // Debugging
        
        res.json({ message: "Ingredient added successfully!", ingredient: newIngredient });
    } catch (err) {
        console.error("Error saving ingredient:", err);
        res.status(500).json({ error: err.message });
    }
});

// **GET all ingredients**
router.route("/").get(async (req, res) => {
    try {
        const ingredients = await Ingredient.find();
        res.json(ingredients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// **GET a single ingredient by ID**
router.route("/get/:id").get(async (req, res) => {
    try {
        let ingredientID = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(ingredientID)) {
            return res.status(400).json({ error: "Invalid ingredient ID." });
        }

        const ingredient = await Ingredient.findById(ingredientID);

        if (!ingredient) {
            return res.status(404).json({ error: "Ingredient not found." });
        }

        res.json(ingredient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// **UPDATE an ingredient**
router.route("/update/:id").put(async (req, res) => {
    try {
        let ingredientID = req.params.id;
        const { name, price, category, macronutrients, micronutrients, expiryDate, storageCondition, measurement } = req.body;

        if (!mongoose.Types.ObjectId.isValid(ingredientID)) {
            return res.status(400).json({ error: "Invalid ingredient ID." });
        }

        const updateIngredient = {
            name,
            price,
            category,
            macronutrients,
            micronutrients,
            expiryDate,
            storageCondition,
            measurement
        };

        const updatedIngredient = await Ingredient.findByIdAndUpdate(ingredientID, updateIngredient, { new: true });

        if (!updatedIngredient) {
            return res.status(404).json({ error: "Ingredient not found." });
        }

        res.json({ message: "Ingredient updated successfully!", ingredient: updatedIngredient });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// **DELETE an ingredient**
router.route("/delete/:id").delete(async (req, res) => {
    try {
        let ingredientID = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(ingredientID)) {
            return res.status(400).json({ error: "Invalid ingredient ID." });
        }

        const deletedIngredient = await Ingredient.findByIdAndDelete(ingredientID);

        if (!deletedIngredient) {
            return res.status(404).json({ error: "Ingredient not found." });
        }

        res.json({ message: "Ingredient deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

console.log(router)//debug

module.exports = router;
