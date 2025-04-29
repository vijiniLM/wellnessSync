import React from "react";
import { useNavigate } from "react-router-dom";
import './styles/EStore.css';
import Navbar from "./Navbar";

const EStore = () => {
  const navigate = useNavigate();

  return (
    <div className="estore-container">
      <Navbar/>
      <div className="welcome-container">
        <h1 className="welcome-message">Welcome to eStore</h1>
        <p className="welcome-text">Browse our selection of fitness equipment and supplements.</p>
      </div>
    </div>
  );
};

export default EStore; 