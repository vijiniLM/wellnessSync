import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // For accessing route params

export default function FoodDetail() {
  const [food, setFood] = useState(null);
  const { id } = useParams(); // Get the food id from the URL

  useEffect(() => {
    axios.get(`http://localhost:8070/food/${id}`) // Fetch food details by ID
      .then(response => setFood(response.data))
      .catch(error => console.error("Error fetching food details:", error));
  }, [id]);

  if (!food) return <p>Loading...</p>;

  return (
    <div className="food-detail-container">
      <h2>{food.name}</h2>
      <img src={food.imageURL || 'defaultImage.jpg'} alt={food.name} />
      <p><strong>Price:</strong> ${food.price}</p>
      <p><strong>Ingredients:</strong> {food.ingredients.join(', ')}</p>
      <p><strong>Discount:</strong> {food.discounts}%</p>
      <h4>Macronutrients</h4>
      <ul>
        <li>Calories: {food.macronutrients.calories}</li>
        <li>Protein: {food.macronutrients.protein}g</li>
        <li>Carbohydrates: {food.macronutrients.carbohydrates}g</li>
        <li>Fats: {food.macronutrients.fats}g</li>
      </ul>
      <h4>Micronutrients</h4>
      <ul>
        <li>Fiber: {food.micronutrients.fiber}g</li>
        <li>Sugar: {food.micronutrients.sugar}g</li>
        <li>Sodium: {food.micronutrients.sodium}mg</li>
      </ul>
      {food.vitamins.length > 0 && (
        <div>
          <h4>Vitamins</h4>
          <ul>
            {food.vitamins.map((vitamin, index) => <li key={index}>{vitamin}</li>)}
          </ul>
        </div>
      )}
      {food.minerals.length > 0 && (
        <div>
          <h4>Minerals</h4>
          <ul>
            {food.minerals.map((mineral, index) => <li key={index}>{mineral}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
