import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../../style/createworkout.css";
const CreateWorkoutPlan = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [exercises, setExercises] = useState([{ name: '', sets: '', reps: '', duration: '' }]);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  // Handle exercise change
  const handleExerciseChange = (index, event) => {
    const updatedExercises = exercises.map((exercise, i) =>
      i === index ? { ...exercise, [event.target.name]: event.target.value } : exercise
    );
    setExercises(updatedExercises);
  };

  // Add a new exercise field
  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: '', reps: '', duration: '' }]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const CreateWorkoutPlan = {
      title,
      description,
      difficulty,
      exercises,
    };

    try {
      /*const response =*/ await axios.post('http://localhost:8000/Create/workoutplan', CreateWorkoutPlan);
      setMessage('Workout Plan created successfully!');
      setTitle('');
      setDescription('');
      setDifficulty('Beginner');
      setExercises([{ name: '', sets: '', reps: '', duration: '' }]);
      navigate("/workout-plan-details")
    } catch (error) {
      setMessage('Error creating workout plan');
    }
  };

  return (
    <div>
      <h1>Create Workout Plan</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Difficulty:</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <h3>Exercises</h3>
        {exercises.map((exercise, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              value={exercise.name}
              onChange={(e) => handleExerciseChange(index, e)}
              placeholder="Exercise Name"
              required
            />
            <input
              type="number"
              name="sets"
              value={exercise.sets}
              onChange={(e) => handleExerciseChange(index, e)}
              placeholder="Sets"
              required
            />
            <input
              type="number"
              name="reps"
              value={exercise.reps}
              onChange={(e) => handleExerciseChange(index, e)}
              placeholder="Reps"
              required
            />
            <input
              type="text"
              name="duration"
              value={exercise.duration}
              onChange={(e) => handleExerciseChange(index, e)}
              placeholder="Duration"
            />
            <button id="bt1" type="button" onClick={() => setExercises(exercises.filter((_, i) => i !== index))}>
              Remove Exercise
            </button>
          </div>
        ))}
        <button id="bt1" type="button" onClick={addExercise}>Add Exercise</button>
        <div>
          <button id="bt1" type="submit">Create Workout Plan</button>
        </div>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateWorkoutPlan;
