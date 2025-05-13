import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderIngredients.css';

export default function OrderIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientDetails, setIngredientDetails] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [showRecipes, setShowRecipes] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeInstructions, setRecipeInstructions] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8070/ingredient')
      .then(response => setIngredients(response.data))
      .catch(error => console.error('Error fetching ingredients:', error));
  }, []);

  const openDetailsModal = (ingredientId) => {
    axios.get(`http://localhost:8070/ingredient/get/${ingredientId}`)
      .then(response => setIngredientDetails(response.data))
      .catch(error => console.error('Error fetching ingredient details:', error));
  };

  const addToCart = (ingredient) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(ingredient);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${ingredient.name} has been added to your cart!`);
  };

  const fetchRecipes = async (ingredientName) => {
    const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
    const randomOffset = Math.floor(Math.random() * 20); // To refresh results
    setSelectedIngredient(ingredientName);
    setSelectedRecipe(null);
    setRecipeInstructions('');
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients`,
        {
          params: {
            ingredients: ingredientName,
            number: 5,
            offset: randomOffset,
            apiKey: apiKey
          }
        }
      );
      setRecipes(response.data);
      setShowRecipes(true);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const fetchRecipeInstructions = async (recipeId) => {
    const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/information`,
        {
          params: {
            includeNutrition: false,
            apiKey: apiKey
          }
        }
      );
      setSelectedRecipe(response.data.title);
      setRecipeInstructions(response.data.instructions || 'No instructions available.');
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  return (
    <div className="ingredients-container">
      <h2>Ingredients</h2>
      <div className="ingredients-grid">
        {ingredients.map(ingredient => (
          <div key={ingredient._id} className="ingredient-card">
            <h4>{ingredient.name}</h4>
            <p>Price: ${ingredient.price}</p>
            <div className="button-group">
              <button className="view-details-button" onClick={() => openDetailsModal(ingredient._id)}>
                View Details
              </button>
              <button className="add-to-cart-button" onClick={() => addToCart(ingredient)}>
                Add to Cart
              </button>
              <button
                className="ai-button"
                title="Suggest Recipes"
                onClick={() => fetchRecipes(ingredient.name)}
              >
                🧠
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {ingredientDetails && (
        <div className="modal">
          <div className="modal-content">
            <h3>{ingredientDetails.name}</h3>
            <p><strong>Category:</strong> {ingredientDetails.category}</p>
            <p><strong>Measurement:</strong> {ingredientDetails.measurement}</p>
            <p><strong>Storage Condition:</strong> {ingredientDetails.storageCondition}</p>
            <p><strong>Expiry Date:</strong> {new Date(ingredientDetails.expiryDate).toLocaleDateString()}</p>
            <p><strong>Macronutrients:</strong> 
              Calories: {ingredientDetails.macronutrients?.calories} kcal, 
              Protein: {ingredientDetails.macronutrients?.protein} g, 
              Carbs: {ingredientDetails.macronutrients?.carbohydrates} g, 
              Fats: {ingredientDetails.macronutrients?.fats} g
            </p>
            <p><strong>Micronutrients:</strong> 
              Fiber: {ingredientDetails.micronutrients?.fiber} g, 
              Sugar: {ingredientDetails.micronutrients?.sugar} g, 
              Sodium: {ingredientDetails.micronutrients?.sodium} mg
            </p>
            <div className="modal-buttons">
              <button onClick={() => setIngredientDetails(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Recipe Suggestions Modal */}
      {showRecipes && (
        <div className="modal">
          <div className="modal-content">
            <h3>Recipe Suggestions with {selectedIngredient}</h3>
            {recipes.length === 0 ? (
              <p>No recipes found.</p>
            ) : (
              <ul>
                {recipes.map((recipe) => (
                  <li key={recipe.id}>
                    <button onClick={() => fetchRecipeInstructions(recipe.id)}>{recipe.title}</button>
                  </li>
                ))}
              </ul>
            )}
            {selectedRecipe && (
              <div className="recipe-instructions">
                <h4>{selectedRecipe}</h4>
                <p>{recipeInstructions}</p>
              </div>
            )}
            <div className="modal-buttons">
              <button onClick={() => fetchRecipes(selectedIngredient)}>Refresh Suggestions</button>
              <button onClick={() => setShowRecipes(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
