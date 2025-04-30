const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: { type: String, required: true }, 
    type: { type: String, enum: ["meal", "package"], required: false},
    ingredients: { type: [String], required: true }, 
    expiryDate: { type: Date, required: true }, 
    price: { type: Number, required: true }, // Added price
    discounts: { type: Number, default: 0, min: 0, max: 100 }, // Ensuring valid discount range

    // Macronutrients
    macronutrients: {
        calories: { type: Number, required: true },
        protein: { type: Number, required: true }, // in grams
        carbohydrates: { type: Number, required: true },
        fats: { type: Number, required: true }
    },

    // Micronutrients
    micronutrients: {
        fiber: { type: Number, required: true },
        sugar: { type: Number, required: true },
        sodium: { type: Number, required: true }
    },

    // Vitamins and Minerals (as an array, since different foods have different vitamins)
    vitamins: { type: [String], required: false }, 
    minerals: { type: [String], required: false } 
});

// **Virtual field to calculate final price after discounts**
foodSchema.virtual('finalPrice').get(function() {
    let final = this.price - (this.price * (this.discounts / 100));
    return final > 0 ? final : 0; // Ensuring price never goes below 0
});

// Include virtuals when converting documents to JSON or objects
foodSchema.set('toJSON', { virtuals: true });
foodSchema.set('toObject', { virtuals: true });

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
