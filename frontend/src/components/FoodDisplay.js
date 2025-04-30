import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FoodDisplay.css';

const FoodDisplay = () => {
  const [foods, setFoods] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [updateForm, setUpdateForm] = useState({});
  const [updateFormIngredient, setUpdateFormIngredient] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foodResponse = await axios.get('http://localhost:8070/food');
        const ingredientResponse = await axios.get('http://localhost:8070/ingredient');
        setFoods(foodResponse.data);
        setIngredients(ingredientResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteFood = (foodId) => {
    if (window.confirm("Are you sure you want to delete this food item?")) {
      axios.delete(`http://localhost:8070/food/delete/${foodId}`)
        .then(() => {
          setFoods(foods.filter(food => food._id !== foodId));
          alert("Food deleted successfully");
        })
        .catch(error => {
          console.error('Error deleting food:', error);
          alert("There was an error deleting the food");
        });
    }
  };

  const handleDeleteIngredient = (ingredientId) => {
    if (window.confirm("Are you sure you want to delete this ingredient?")) {
      axios.delete(`http://localhost:8070/ingredient/delete/${ingredientId}`)
        .then(() => {
          setIngredients(ingredients.filter(ingredient => ingredient._id !== ingredientId));
          alert("Ingredient deleted successfully");
        })
        .catch(error => {
          console.error('Error deleting ingredient:', error);
          alert("There was an error deleting the ingredient");
        });
    }
  };

  const handleUpdateClick = (food) => {
    setSelectedFood(food);
    setSelectedIngredient(null);
    setUpdateForm({
      name: food.name,
      type: food.type,
      ingredients: food.ingredients.join(', '),
      expiryDate: new Date(food.expiryDate).toISOString().split('T')[0],
      finalPrice: food.finalPrice,
      discount: food.discount || 0,
      calories: food.macronutrients.calories,
      protein: food.macronutrients.protein,
      carbohydrates: food.macronutrients.carbohydrates,
      fats: food.macronutrients.fats,
      fiber: food.micronutrients.fiber,
      sugar: food.micronutrients.sugar,
      sodium: food.micronutrients.sodium,
    });
  };

  const handleUpdateIngredientClick = (ingredient) => {
    setSelectedIngredient(ingredient);
    setSelectedFood(null);
    setUpdateFormIngredient({
      name: ingredient.name,
      category: ingredient.category,
      measurement: ingredient.measurement,
      storageCondition: ingredient.storageCondition,
      expiryDate: new Date(ingredient.expiryDate).toISOString().split('T')[0],
      price: ingredient.price,
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["finalPrice", "calories", "protein", "carbohydrates", "fats", "fiber", "sugar", "sodium", "discount"];
    const updatedValue = numericFields.includes(name) ? parseFloat(value) || "" : value;
    setUpdateForm({ ...updateForm, [name]: updatedValue });
  };

  const handleFormIngredientChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["price"];
    const updatedValue = numericFields.includes(name) ? parseFloat(value) || "" : value;
    setUpdateFormIngredient({ ...updateFormIngredient, [name]: updatedValue });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...updateForm,
      ingredients: updateForm.ingredients.split(',').map(item => item.trim()),
      finalPrice: parseFloat(updateForm.finalPrice.toFixed(2)),
      discount: parseFloat(updateForm.discount) || 0,
      macronutrients: {
        calories: parseFloat(updateForm.calories.toFixed(2)),
        protein: parseFloat(updateForm.protein.toFixed(2)),
        carbohydrates: parseFloat(updateForm.carbohydrates.toFixed(2)),
        fats: parseFloat(updateForm.fats.toFixed(2)),
      },
      micronutrients: {
        fiber: parseFloat(updateForm.fiber.toFixed(2)),
        sugar: parseFloat(updateForm.sugar.toFixed(2)),
        sodium: parseFloat(updateForm.sodium.toFixed(2)),
      },
    };

    axios.put(`http://localhost:8070/food/update/${selectedFood._id}`, updatedData)
      .then(() => {
        alert("Food updated successfully!");
        setFoods(foods.map(food =>
          food._id === selectedFood._id ? { ...food, ...updatedData } : food
        ));
        setSelectedFood(null);
      })
      .catch(error => {
        console.error('Error updating food:', error);
        alert("There was an error updating the food");
      });
  };

  const handleUpdateIngredientSubmit = (e) => {
    e.preventDefault();
    const updatedIngredientData = {
      ...updateFormIngredient,
      price: parseFloat(updateFormIngredient.price.toFixed(2)),
    };

    axios.put(`http://localhost:8070/ingredient/update/${selectedIngredient._id}`, updatedIngredientData)
      .then(() => {
        alert("Ingredient updated successfully!");
        setIngredients(ingredients.map(ingredient =>
          ingredient._id === selectedIngredient._id ? { ...ingredient, ...updatedIngredientData } : ingredient
        ));
        setSelectedIngredient(null);
      })
      .catch(error => {
        console.error('Error updating ingredient:', error);
        alert("There was an error updating the ingredient");
      });
  };

  if (loading) {
    return <div className="loading">Loading foods and ingredients...</div>;
  }

  return (
    <div className="food-display-container">
      <h2>Available Foods</h2>
      <div className="food-list">
        {foods.length === 0 ? (
          <p>No foods available at the moment.</p>
        ) : (
          foods.map(food => (
            <div key={food._id} className="food-card">
              <h3>{food.name}</h3>
              <p>Type: {food.type}</p>
              <p>Ingredients: {food.ingredients.join(', ')}</p>
              <p>Expiry Date: {new Date(food.expiryDate).toLocaleDateString()}</p>
              {food.discount && food.discount > 0 ? (
                <p>
                  Price: <span style={{ textDecoration: 'line-through' }}>${food.finalPrice.toFixed(2)}</span>{' '}
                  <span style={{ color: 'red', fontWeight: 'bold' }}>
                    ${(food.finalPrice * (1 - food.discount / 100)).toFixed(2)} ({food.discount}% off)
                  </span>
                </p>
              ) : (
                <p>Price: ${food.finalPrice.toFixed(2)}</p>
              )}
              <p>Calories: {food.macronutrients.calories} kcal</p>
              <p>Protein: {food.macronutrients.protein}g</p>
              <p>Carbs: {food.macronutrients.carbohydrates}g</p>
              <p>Fats: {food.macronutrients.fats}g</p>
              <p>Fiber: {food.micronutrients.fiber}g</p>
              <p>Sugar: {food.micronutrients.sugar}g</p>
              <p>Sodium: {food.micronutrients.sodium}mg</p>
              <div className="food-actions">
                <button onClick={() => handleUpdateClick(food)}>Update</button>
                <button className="delete-button" onClick={() => handleDeleteFood(food._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      <h2>Available Ingredients</h2>
      <div className="food-list">
        {ingredients.length === 0 ? (
          <p>No ingredients available at the moment.</p>
        ) : (
          ingredients.map(ingredient => (
            <div key={ingredient._id} className="food-card">
              <h3>{ingredient.name}</h3>
              <p>Category: {ingredient.category}</p>
              <p>Measurement: {ingredient.measurement}</p>
              <p>Storage Condition: {ingredient.storageCondition}</p>
              <p>Expiry Date: {new Date(ingredient.expiryDate).toLocaleDateString()}</p>
              <p>Price: ${ingredient.price.toFixed(2)}</p>
              <div className="food-actions">
                <button onClick={() => handleUpdateIngredientClick(ingredient)}>Update</button>
                <button className="delete-button" onClick={() => handleDeleteIngredient(ingredient._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedFood && (
        <div className="update-form-container active">
          <h3>Update Food Details</h3>
          <form onSubmit={handleUpdateSubmit}>
            <label>Name:</label>
            <input type="text" name="name" value={updateForm.name} onChange={handleFormChange} required />

            <label>Type:</label>
            <input type="text" name="type" value={updateForm.type} onChange={handleFormChange} required />

            <label>Ingredients (comma-separated):</label>
            <input type="text" name="ingredients" value={updateForm.ingredients} onChange={handleFormChange} required />

            <label>Expiry Date:</label>
            <input type="date" name="expiryDate" value={updateForm.expiryDate} onChange={handleFormChange} required />

            <label>Price:</label>
            <input type="number" name="finalPrice" value={updateForm.finalPrice} onChange={handleFormChange} required />

            <label>Discount (%):</label>
            <input type="number" name="discount" value={updateForm.discount} onChange={handleFormChange} />

            <label>Calories:</label>
            <input type="number" name="calories" value={updateForm.calories} onChange={handleFormChange} required />

            <label>Protein:</label>
            <input type="number" name="protein" value={updateForm.protein} onChange={handleFormChange} required />

            <label>Carbohydrates:</label>
            <input type="number" name="carbohydrates" value={updateForm.carbohydrates} onChange={handleFormChange} required />

            <label>Fats:</label>
            <input type="number" name="fats" value={updateForm.fats} onChange={handleFormChange} required />

            <label>Fiber:</label>
            <input type="number" name="fiber" value={updateForm.fiber} onChange={handleFormChange} required />

            <label>Sugar:</label>
            <input type="number" name="sugar" value={updateForm.sugar} onChange={handleFormChange} required />

            <label>Sodium:</label>
            <input type="number" name="sodium" value={updateForm.sodium} onChange={handleFormChange} required />

            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setSelectedFood(null)}>Cancel</button>
          </form>
        </div>
      )}

      {selectedIngredient && (
        <div className="update-form-container active">
          <h3>Update Ingredient Details</h3>
          <form onSubmit={handleUpdateIngredientSubmit}>
            <label>Name:</label>
            <input type="text" name="name" value={updateFormIngredient.name} onChange={handleFormIngredientChange} required />

            <label>Category:</label>
            <input type="text" name="category" value={updateFormIngredient.category} onChange={handleFormIngredientChange} required />

            <label>Measurement:</label>
            <input type="text" name="measurement" value={updateFormIngredient.measurement} onChange={handleFormIngredientChange} required />

            <label>Storage Condition:</label>
            <input type="text" name="storageCondition" value={updateFormIngredient.storageCondition} onChange={handleFormIngredientChange} required />

            <label>Expiry Date:</label>
            <input type="date" name="expiryDate" value={updateFormIngredient.expiryDate} onChange={handleFormIngredientChange} required />

            <label>Price:</label>
            <input type="number" name="price" value={updateFormIngredient.price} onChange={handleFormIngredientChange} required />

            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setSelectedIngredient(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
