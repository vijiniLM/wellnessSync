import React, { useState } from "react";
import axios from "axios";

const AddIngredient = () => {
  const [ingredient, setIngredient] = useState({
    name: "",
    price: "",
    category: "",
    macronutrients: { calories: "", protein: "", carbohydrates: "", fats: "" },
    micronutrients: { fiber: "", sugar: "", sodium: "" },
    expiryDate: "",
    storageCondition: "",
    measurement: "",
  });

  // Handle changes for normal text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIngredient({ ...ingredient, [name]: value });
  };

  // Handle changes for nested objects like macronutrients and micronutrients
  const handleNestedChange = (e, category) => {
    const { name, value } = e.target;
    setIngredient({
      ...ingredient,
      [category]: { ...ingredient[category], [name]: value },
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure required fields are filled
    if (
      !ingredient.name ||
      !ingredient.price ||
      !ingredient.category ||
      !ingredient.expiryDate ||
      !ingredient.storageCondition ||
      !ingredient.measurement
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("New Ingredient Object:", ingredient); // Debugging log

    try {
      await axios.post("http://localhost:8070/ingredient/add", ingredient);
      alert("Ingredient added successfully!");

      // Reset form fields
      setIngredient({
        name: "",
        price: "",
        category: "",
        macronutrients: { calories: "", protein: "", carbohydrates: "", fats: "" },
        micronutrients: { fiber: "", sugar: "", sodium: "" },
        expiryDate: "",
        storageCondition: "",
        measurement: "",
      });
    } catch (error) {
      console.error("Error adding ingredient:", error);
      alert("Failed to add ingredient. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Ingredient</h2>
      <form onSubmit={handleSubmit}>
        {/* Ingredient Name */}
        <div className="mb-3">
          <label className="form-label">Ingredient Name</label>
          <input type="text" className="form-control" name="name" value={ingredient.name} onChange={handleChange} required />
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" className="form-control" name="price" value={ingredient.price} onChange={handleChange} required />
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select className="form-select" name="category" value={ingredient.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="vegetable">Vegetable</option>
            <option value="fruit">Fruit</option>
            <option value="grain">Grain</option>
          </select>
        </div>

        {/* Macronutrients */}
        <h5>Macronutrients (per serving)</h5>
        {["calories", "protein", "carbohydrates", "fats"].map((nutrient) => (
          <div className="mb-3" key={nutrient}>
            <label className="form-label">{nutrient.charAt(0).toUpperCase() + nutrient.slice(1)} (g)</label>
            <input type="number" className="form-control" name={nutrient} value={ingredient.macronutrients[nutrient]} onChange={(e) => handleNestedChange(e, "macronutrients")} />
          </div>
        ))}

        {/* Micronutrients */}
        <h5>Micronutrients (per serving)</h5>
        {["fiber", "sugar", "sodium"].map((nutrient) => (
          <div className="mb-3" key={nutrient}>
            <label className="form-label">{nutrient.charAt(0).toUpperCase() + nutrient.slice(1)} (mg)</label>
            <input type="number" className="form-control" name={nutrient} value={ingredient.micronutrients[nutrient]} onChange={(e) => handleNestedChange(e, "micronutrients")} required />
          </div>
        ))}

        {/* Expiry Date */}
        <div className="mb-3">
          <label className="form-label">Expiry Date</label>
          <input type="date" className="form-control" name="expiryDate" value={ingredient.expiryDate} onChange={handleChange} required />
        </div>

        {/* Storage Condition */}
        <div className="mb-3">
          <label className="form-label">Storage Condition</label>
          <input type="text" className="form-control" name="storageCondition" value={ingredient.storageCondition} onChange={handleChange} required />
        </div>

        {/* Measurement */}
        <div className="mb-3">
          <label className="form-label">Measurement</label>
          <input type="text" className="form-control" name="measurement" value={ingredient.measurement} onChange={handleChange} required />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Add Ingredient</button>
      </form>
    </div>
  );
};

export default AddIngredient;
