import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login'; // Make sure to import Login component
import './App.css';
import AdminDashboard from './components/AdminDashboard';
import UpdateUser from './components/UpdateUser';
import Dashboard from './components/Dashboard';
import TrainerDashboard from './components/TrainerDashboard';
import DeliveryDashboard from './components/DeliveryDashboard';
import EStore from './components/EStore';
import HealthyMeals from './components/HealthyMeals';
import WorkoutPlans from './components/WorkoutPlans';
import Footer from './components/Footer';

function App() {
  return (
    
      <div className="App">
        <Routes>
          {/* Define routes for Signup and Login */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<><Dashboard/><Footer/></>} />
          <Route path="/admin" element={<><AdminDashboard/><Footer/></>} />
          <Route path="/trainer" element={<><TrainerDashboard/><Footer/></>} />
          <Route path="/delivery" element={<><DeliveryDashboard/><Footer/></>} />
          <Route path="/update/:id" element={<><UpdateUser/><Footer/></>} />
          <Route path="/estore" element={<><EStore/><Footer/></>} />
          <Route path="/meals" element={<><HealthyMeals/><Footer/></>} />
          <Route path="/workouts" element={<><WorkoutPlans/><Footer/></>} />
        </Routes>
      </div>
    
  );
}

export default App;