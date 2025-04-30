import React, { useState } from "react";
import axios from "axios";

export function AddFood() {
  const [food, setFood] = useState({
    name: "",
    type: "meal",
    ingredients: [],
    expiryDate: "",
    price: "",
    discounts: "",
    macronutrients: { calories: "", protein: "", carbohydrates: "", fats: "" },
    micronutrients: { fiber: "", sugar: "", sodium: "" },
    vitamins: [],
    minerals: [],
  });

  // Handle changes for normal text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood({ ...food, [name]: value });
  };

  // Handle changes for nested objects like macronutrients and micronutrients
  const handleNestedChange = (e, category) => {
    const { name, value } = e.target;
    setFood({ ...food, [category]: { ...food[category], [name]: value } });
  };

  // Handle array inputs (ingredients, vitamins, minerals)
  const handleArrayChange = (e, field) => {
    const arrayValues = e.target.value
      .split(",") // Split by commas
      .map((item) => item.trim()) // Trim spaces
      .filter((item) => item !== ""); // Remove empty items

    setFood({ ...food, [field]: arrayValues });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure required fields are filled
    if (!food.name || !food.expiryDate || !food.price) {
      alert("Please fill in all required fields.");
      return;
    }

    // Clean up the data before sending
    const newFood = {
      ...food,
      ingredients: food.ingredients.filter((item) => item.trim() !== ""),
      vitamins: food.vitamins.filter((item) => item.trim() !== ""),
      minerals: food.minerals.filter((item) => item.trim() !== ""),
      discounts: food.discounts || 0,
    };

    console.log("New Food Object:", newFood); // Debugging log

    try {
      await axios.post("http://localhost:8070/food/add", newFood);
      alert("Food added successfully!");

      // Reset form fields
      setFood({
        name: "",
        type: "meal",
        ingredients: [],
        expiryDate: "",
        price: "",
        discounts: "",
        macronutrients: { calories: "", protein: "", carbohydrates: "", fats: "" },
        micronutrients: { fiber: "", sugar: "", sodium: "" },
        vitamins: [],
        minerals: [],
      });
    } catch (error) {
      console.error("Error adding food:", error);
      alert("Failed to add food. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Food</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Food Name */}
        <div className="mb-3">
          <label className="form-label">Food Name</label>
          <input type="text" className="form-control" name="name" value={food.name} onChange={handleChange} required />
        </div>

        {/* Food Type */}
        <div className="mb-3">
          <label className="form-label">Type</label>
          <select className="form-select" name="type" value={food.type} onChange={handleChange}>
            <option value="meal">Meal</option>
            <option value="package">Package</option>
          </select>
        </div>

        {/* Ingredients */}
        <div className="mb-3">
          <label className="form-label">Ingredients (comma-separated)</label>
          <input type="text" className="form-control" value={food.ingredients.join(", ")} onChange={(e) => handleArrayChange(e, "ingredients")} required />
        </div>

        {/* Expiry Date */}
        <div className="mb-3">
          <label className="form-label">Expiry Date</label>
          <input type="date" className="form-control" name="expiryDate" value={food.expiryDate} onChange={handleChange} required />
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" className="form-control" name="price" value={food.price} onChange={handleChange} required />
        </div>

        {/* Discounts */}
        <div className="mb-3">
          <label className="form-label">Discount (%)</label>
          <input type="number" className="form-control" name="discounts" value={food.discounts} onChange={handleChange} />
        </div>

        {/* Macronutrients */}
        <h5>Macronutrients (per serving)</h5>
        {["calories", "protein", "carbohydrates", "fats"].map((nutrient) => (
          <div className="mb-3" key={nutrient}>
            <label className="form-label">{nutrient.charAt(0).toUpperCase() + nutrient.slice(1)} (g)</label>
            <input type="number" className="form-control" name={nutrient} value={food.macronutrients[nutrient]} onChange={(e) => handleNestedChange(e, "macronutrients")} required />
          </div>
        ))}

        {/* Micronutrients */}
        <h5>Micronutrients (per serving)</h5>
        {["fiber", "sugar", "sodium"].map((nutrient) => (
          <div className="mb-3" key={nutrient}>
            <label className="form-label">{nutrient.charAt(0).toUpperCase() + nutrient.slice(1)} (mg)</label>
            <input type="number" className="form-control" name={nutrient} value={food.micronutrients[nutrient]} onChange={(e) => handleNestedChange(e, "micronutrients")} required />
          </div>
        ))}

        {/* Vitamins */}
        <div className="mb-3">
          <label className="form-label">Vitamins (comma-separated)</label>
          <input type="text" className="form-control" value={food.vitamins.join(", ")} onChange={(e) => handleArrayChange(e, "vitamins")} />
        </div>

        {/* Minerals */}
        <div className="mb-3">
          <label className="form-label">Minerals (comma-separated)</label>
          <input type="text" className="form-control" value={food.minerals.join(", ")} onChange={(e) => handleArrayChange(e, "minerals")} />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Add Food</button>
      </form>
    </div>
  );
}
