import React from "react";
import { useNavigate } from "react-router-dom";
import './styles/WorkoutPlans.css';
import Navbar from "./Navbar";

const WorkoutPlans = () => {
  const navigate = useNavigate();

  return (
    <div className="workouts-container">
      <Navbar/>
      <div className="welcome-container">
        <h1 className="welcome-message">Workout Plans</h1>
        <p className="welcome-text">Access personalized workout routines and training programs.</p>
      </div>
    </div>
  );
};

export default WorkoutPlans; 