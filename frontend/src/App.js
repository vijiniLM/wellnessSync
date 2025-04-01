import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Import components
import ViewallTrainers from './Components/WorkoutPlanManagement/ViewalltrainersAdmin';
import TrainerDashboard from './Components/WorkoutPlanManagement/TrainerDashboard';
import CreateWorkoutPlan from './Components/WorkoutPlanManagement/CreateWorkoutPlan';
import WorkoutPlanDetails from './Components/WorkoutPlanManagement/WorkoutPlanDetails';
import DisplayAllTrainers from './Components/WorkoutPlanManagement/DisplayAllTrainers';
import BookingTrainer from './Components/WorkoutPlanManagement/bookingtrainer.jsx';

// components routes 
export default function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/tdashboard" element={<TrainerDashboard />} />
        <Route path="/v" element={<ViewallTrainers />} />
        <Route path="/Create-Workout-Plan" element={<CreateWorkoutPlan />} />
        <Route path="/workout-plan-details" element={<WorkoutPlanDetails />} /> 
        <Route path="/" element={<DisplayAllTrainers />} />
        <Route path="/booking/:id" element={<BookingTrainer />} />
      </Routes>
    </BrowserRouter>
  );
}
