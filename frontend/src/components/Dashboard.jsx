import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './styles/Dashboard.css'; // Import CSS for dashboard styling
import Navbar from "./Navbar";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement the logout functionality here
    // For example, clear the localStorage token and redirect to the login page
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleNavigation = (path) => {
    console.log("Navigating to:", path);
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      {/* Navigation Bar */}
      <Navbar/>

      {/* Welcome message */}
      <div className="welcome-container">
        <h1 className="welcome-message">Welcome to the Wellness-Sync
          
        </h1>
        <p className="welcome-text">This is your dashboard where you can manage your account and access various features.</p>
      </div>

      <div className="features-container">
        <div className="feature-card">
          <h2>eStore</h2>
          <p>Browse and purchase fitness equipment and supplements</p>
          <button 
            onClick={() => handleNavigation("/estore")} 
            className="feature-link"
          >
            Visit eStore
          </button>
        </div>

        <div className="feature-card">
          <h2>Healthy Meals</h2>
          <p>Explore our selection of nutritious meal plans</p>
          <button 
            onClick={() => handleNavigation("/meals")} 
            className="feature-link"
          >
            View Meals
          </button>
        </div>

        <div className="feature-card">
          <h2>Workout Plans</h2>
          <p>Access personalized workout routines and training programs</p>
          <button 
            onClick={() => handleNavigation("/workouts")} 
            className="feature-link"
          >
            View Workouts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;