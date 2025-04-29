import React from "react";
import { Link } from "react-router-dom";
import './styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>FitnessHub</h3>
          <p>Your one-stop destination for fitness and wellness.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/dashboard">Home</Link></li>
            <li><Link to="/estore">eStore</Link></li>
            <li><Link to="/meals">Healthy Meals</Link></li>
            <li><Link to="/workouts">Workout Plans</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: info@fitnesshub.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <div className="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FitnessHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 