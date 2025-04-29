import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './styles/Login.css'; // Import the custom CSS

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    try {
      const response = await axios.post("http://localhost:8070/user/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        console.log("JWT Token saved:", response.data.token);
        
        // Redirect based on role
        const role = response.data.role;
        if (role === 'admin') {
          navigate("/admin");
        } else if (role === 'trainer') {
          navigate("/trainer");
        } else if (role === 'delivery') {
          navigate("/delivery");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Invalid credentials or error logging in.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Login</button>

          
        </form>

        <div className="signup-link-container">
        <p>Not registered yet? <Link to="/signup" className="signup-link">Signup here</Link>.</p>
      </div>
    
      </div>
    </div>
  );
};

export default Login;