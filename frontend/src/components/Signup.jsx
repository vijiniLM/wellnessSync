import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './styles/Signup.css'; // Import the new CSS file
import Navbar from "./Navbar";

const Signup = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password_hash: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    fitness_goal: "",
    address: "",
    phone_number: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data being sent:", formData);
    
    try {
      const response = await axios.post("http://localhost:8070/user/signup", formData);
      if (response.status === 201) {
        navigate("/login"); // Redirect to login page after successful signup
      }
    } catch (error) {
      console.error("Error during signup:", error); 
      setErrorMessage(error.response?.data?.message || error.message || "An unknown error occurred");
    }
  };

  return (
    <div className="signup-container">
      
      <h2 className="signup-heading">Signup</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label className="label">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Password</label>
          <input
            type="password"
            name="password_hash"
            value={formData.password_hash}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="1"
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="input"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label className="label">Height (in cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
            min="0"
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Weight (in kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            min="0"
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Fitness Goal</label>
          <input
            type="text"
            name="fitness_goal"
            value={formData.fitness_goal}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            pattern="^\d{10}$"
            className="input"
          />
        </div>
        <button type="submit" className="submit-button">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;