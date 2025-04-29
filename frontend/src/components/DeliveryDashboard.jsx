import React from "react";
import { useNavigate } from "react-router-dom";
import './styles/DeliveryDashboard.css';
import Navbar from "./Navbar";

const DeliveryDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="delivery-dashboard-container">
      <Navbar/>
      <div className="welcome-container">
        <h1 className="welcome-message">Welcome to Delivery Dashboard</h1>
        <p className="welcome-text">This is your delivery dashboard where you can manage your delivery tasks and orders.</p>
      </div>
    </div>
  );
};

export default DeliveryDashboard; 