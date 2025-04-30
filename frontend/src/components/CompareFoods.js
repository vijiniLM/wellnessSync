import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CompareFoods.css";

// Example mapping of ingredients to their detailed data
const ingredientData = {
  chicken: {
    calories: 165,
    moodBenefits: ["Muscle recovery"],
    workoutTime: "After Workout",
    allergens: ["None"],
  },
  rice: {
    calories: 130,
    moodBenefits: ["Energy boost"],
    workoutTime: "Anytime",
    allergens: ["None"],
  },
  broccoli: {
    calories: 55,
    moodBenefits: ["Vitamin C boost", "Digestive support"],
    workoutTime: "Anytime",
    allergens: ["None"],
  },
  // Add more ingredients and their data as needed...
};

// Function to calculate total calories based on ingredient names
function calculateCalories(ingredients) {
  return ingredients.reduce(
    (total, ingredient) => total + (ingredientData[ingredient]?.calories || 0),
    0
  );
}

export default function CompareFoods() {
  const [foods, setFoods] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/food")
      .then((res) => setFoods(res.data))
      .catch((err) => console.error("Error fetching food items:", err));
  }, []);

  const toggleSelect = (food) => {
    if (selected.some((f) => f._id === food._id)) {
      setSelected(selected.filter((f) => f._id !== food._id));
    } else if (selected.length < 2) {
      setSelected([...selected, food]);
    }
  };

  return (
    <div className="compare-container">
      <h2>Compare Foods</h2>
      <div className="food-list">
        {foods.map((food) => (
          <div
            key={food._id}
            className={`food-card ${
              selected.some((f) => f._id === food._id) ? "selected" : ""
            }`}
            onClick={() => toggleSelect(food)}
          >
            <h3>{food.name}</h3>
          </div>
        ))}
      </div>

      {selected.length === 2 && (
        <div className="comparison-table">
          <h3>Food Comparison</h3>
          <div className="comparison-columns">
            {selected.map((food, index) => (
              <div key={index} className="compare-card">
                <h4>{food.name}</h4>
                <p>
                  <strong>Estimated Calories:</strong>{" "}
                  {calculateCalories(food.ingredients)} kcal
                </p>
                <p><strong>Protein:</strong> {food.macronutrients?.protein}g</p>
                <p><strong>Carbs:</strong> {food.macronutrients?.carbohydrates}g</p>
                <p><strong>Fats:</strong> {food.macronutrients?.fats}g</p>
                <p><strong>Workout Suitability:</strong> {food.workoutTime}</p>
                <p><strong>Mood/Body Benefits:</strong> {food.moodBenefits?.join(", ")}</p>
                <p><strong>Allergens:</strong> {food.allergens?.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
