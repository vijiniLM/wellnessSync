import React from "react";
import { useNavigate } from "react-router-dom";
import './styles/TrainerDashboard.css';
import Navbar from "./Navbar";

const TrainerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="trainer-dashboard-container">
      <Navbar/>
      <div className="welcome-container">
        <h1 className="welcome-message">Welcome to Trainer Dashboard</h1>
        <p className="welcome-text">This is your trainer dashboard where you can manage your training sessions and clients.</p>
      </div>
    </div>
  );
};

export default TrainerDashboard; 