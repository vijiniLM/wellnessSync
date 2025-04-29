import React from "react";
import { useNavigate } from "react-router-dom";
import './styles/HealthyMeals.css';
import Navbar from "./Navbar";

const HealthyMeals = () => {
  const navigate = useNavigate();

  return (
    <div className="meals-container">
      <Navbar/>
      <div className="welcome-container">
        <h1 className="welcome-message">Healthy Meals</h1>
        <p className="welcome-text">Explore our selection of nutritious meal plans.</p>
      </div>
    </div>
  );
};

export default HealthyMeals; 