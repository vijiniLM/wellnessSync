import React from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom for navigation

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className="nav-link active" to="/">Order Food</Link>{/* Link to food on nav bar */}

            </li>
            
            
            <li className="nav-item">
              <Link className="nav-link" to="/food-display">Food Display</Link> {/* Link to FoodDisplay page */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-food">Add Food</Link>  {/* Link to Add Food page */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-ingredient">Add Ingredient</Link>  {/* Link to Add Ingredient page */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">Cart</Link> {/* Link to Cart page */}
            </li>
            
            


            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
