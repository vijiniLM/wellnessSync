import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // Importing necessary Router components

import './App.css';
import CounterClass from './components/CounterClass';
import Header from './components/Header';
import { AddFood } from './components/AddFood';
import AddIngredient from './components/AddIngredient';  // Importing AddIngredient component
import AllFoods from './components/AllFoods'; 
import FoodCart from './components/FoodCart';
import FoodDisplay from './components/FoodDisplay'; 
import OrderIngredients from './components/OrderIngredients';  // ⭐️ [Added this import]
import CompareFoods from './components/CompareFoods';


function App() {
  return (
    <Router>  {/* Wrap your components with Router */}
      <div>
        <Header />  {/* This will be the navigation bar */}
        
        {/* Routes to switch between pages */}
        <Routes>
        <Route path="/" element={<AllFoods />} />{/* Home route */}
          <Route path="/add-food" element={<AddFood />} />  {/* Food route */}
          <Route path="/food-display" element={<FoodDisplay />} />  {/* Correctly named route for FoodDisplay */}
          <Route path="/add-ingredient" element={<AddIngredient />} />  {/* Ingredient route */}
          <Route path="/all-foods" element={<AllFoods />} /> {/* 🔥 Added AllFoods route separately */}
          <Route path="/all-foods" element={<AllFoods />} />  {/* Added this route */}
          <Route path="/cart" element={<FoodCart />} /> {/* Cart page route */}
          <Route path="/order-ingredients" element={<OrderIngredients />} /> {/* ⭐️ [Added this route] */}
          <Route path="/compare-foods" element={<CompareFoods />} />
          
           
        </Routes>
      </div>
    </Router>
  );
}

export default App;
