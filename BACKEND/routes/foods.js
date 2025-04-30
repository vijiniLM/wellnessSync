const mongoose = require("mongoose");
const router = require("express").Router();
let Food = require("../models/food");


// **Route to add a new food item**
router.route("/add").post(async (req, res) => {
    try {
        console.log("Received Data:", req.body); // Debugging
        console.log("Extracted Data:", req.body); // See what we are receiving

        
        const { 
            name, 
            type = "meal",  // Default to "meal" if not provided
            ingredients = [], 
            expiryDate, 
            price = 0,  // Default to 0 if missing
            discounts = 0,  // Default to 0 if missing
            macronutrients = {}, 
            micronutrients = {}, 
            vitamins = [], 
            minerals = [] 
        } = req.body;

        // Ensuring macronutrients and micronutrients are valid objects
        const calories = macronutrients.calories ? Number(macronutrients.calories) : 0;
        const protein = macronutrients.protein ? Number(macronutrients.protein) : 0;
        const carbohydrates = macronutrients.carbohydrates ? Number(macronutrients.carbohydrates) : 0;
        const fats = macronutrients.fats ? Number(macronutrients.fats) : 0;
        const fiber = micronutrients.fiber ? Number(micronutrients.fiber) : 0;
        const sugar = micronutrients.sugar ? Number(micronutrients.sugar) : 0;
        const sodium = micronutrients.sodium ? Number(micronutrients.sodium) : 0;
        const parsedPrice = Number(price);
        const parsedDiscounts = Number(discounts);

        // Validate expiryDate as a Date
        const parsedExpiryDate = new Date(expiryDate);
        if (isNaN(parsedExpiryDate.getTime())) {
            return res.status(400).json({ error: "Expiry Date must be a valid date." });
        }

        // Validate numerical fields
        if ([calories, protein, carbohydrates, fats, fiber, sugar, sodium, parsedPrice, parsedDiscounts].some(isNaN)) {
            return res.status(400).json({ error: "All numerical fields must be valid numbers." });
        }

        // Validate discount range (0-100)
        if (parsedDiscounts < 0 || parsedDiscounts > 100) {
            return res.status(400).json({ error: "Discounts must be between 0 and 100." });
        }

        //added later
        console.log("Processed Data:", {
            name,
            type,
            ingredients,
            expiryDate,
            price,
            discounts,
            macronutrients,
            micronutrients,
            vitamins,
            minerals
        }); 
        

        // Create the food item
        const newFood = new Food({
            name,
            type,
            ingredients,
            expiryDate: parsedExpiryDate,
            price: parsedPrice,
            discounts: parsedDiscounts,
            macronutrients: { calories, protein, carbohydrates, fats },
            micronutrients: { fiber, sugar, sodium },
            vitamins,
            minerals
        });

        console.log("Data to be saved:", newFood); // Debugging

        await newFood.save();
        res.json({ message: "Food added successfully!", food: newFood });
    } catch (err) {
        console.error("Error saving food:", err); // Debugging
        res.status(500).json({ error: err.message });
    }
});


// **GET all foods**
router.route("/").get(async (req, res) => {  
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// **GET a single food item by ID**
router.route("/get/:id").get(async (req, res) => {
    try {
        let foodID = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(foodID)) {
            return res.status(400).json({ error: "Invalid food ID." });
        }

        const food = await Food.findById(foodID);

        if (!food) {
            return res.status(404).json({ error: "Food item not found." });
        }

        res.json(food);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// **UPDATE a food item**
router.route("/update/:id").put(async (req, res) => {
    try {
        let foodID = req.params.id;
        const { name, type, ingredients, expiryDate, price, discounts, macronutrients, micronutrients, vitamins, minerals } = req.body;

        if (!mongoose.Types.ObjectId.isValid(foodID)) {
            return res.status(400).json({ error: "Invalid food ID." });
        }

        const updateFood = {
            name, 
            type,
            ingredients, 
            expiryDate, 
            price,
            discounts,
            macronutrients, 
            micronutrients, 
            vitamins, 
            minerals
        };

        const updatedFood = await Food.findByIdAndUpdate(foodID, updateFood, { new: true });

        if (!updatedFood) {
            return res.status(404).json({ error: "Food item not found." });
        }

        res.json({ message: "Food updated successfully!", food: updatedFood });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// **DELETE a food item**
router.route("/delete/:id").delete(async (req, res) => {
    try {
        let foodID = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(foodID)) {
            return res.status(400).json({ error: "Invalid food ID." });
        }

        const deletedFood = await Food.findByIdAndDelete(foodID);

        if (!deletedFood) {
            return res.status(404).json({ error: "Food item not found." });
        }

        res.json({ message: "Food deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
