const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, enum: ["vegetable", "fruit", "grain"], required: true },
    macronutrients: {
        calories: { type: Number, required: false},
        protein: { type: Number, required: false },
        carbohydrates: { type: Number, required: false },
        fats: { type: Number, required: false }
    },
    micronutrients: {
        fiber: { type: Number, required: true },
        sugar: { type: Number, required: true },
        sodium: { type: Number, required: true }
    },
    expiryDate: { type: Date, required: true },
    storageCondition: { type: String, required: true },
    measurement: { type: String, required: true }
});

// Include virtuals when converting documents to JSON or objects
ingredientSchema.set('toJSON', { virtuals: true });
ingredientSchema.set('toObject', { virtuals: true });

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
