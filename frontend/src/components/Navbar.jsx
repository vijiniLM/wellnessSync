import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './styles/Navbar.css'; // Import CSS for navbar styling

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    // Implement the logout functionality here
    // For example, clear the localStorage token and redirect to the login page
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/dashboard" className="logo-link">Wellness Sync</Link>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link to="/dashboard" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/estore" className="navbar-link">eStore</Link>
          </li>
          <li className="navbar-item">
            <Link to="/meals" className="navbar-link">Healthy Meals</Link>
          </li>
          <li className="navbar-item">
            <Link to="/workouts" className="navbar-link">Workout Plans</Link>
          </li>
          <li className="navbar-item">
            <Link to="/profile" className="navbar-link">Profile</Link>
          </li>
          <li className="navbar-item">
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;