import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import parts from "../assets/logo/White-logo.png";

const Navbar = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  
  // Check if the user is authenticated (based on the presence of a token)
  const isAuthenticated = localStorage.getItem('token');
  const userData = JSON.parse(localStorage.getItem('user')) || { name: "User" }; // Get user's data from localStorage
  const fullName = userData.name; // Extract the name

  // Get initials (first letter of first and last name)
  const getInitials = (name) => {
    const nameParts = name.split(' ');
    return nameParts.map(part => part.charAt(0).toUpperCase()).join('').slice(0, 2);
  };

  // Logout function
  const logout = () => {
    // Remove token from localStorage to log out the user
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect the user to the login page or home page
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand ms-5" href="/">
            <img src={parts} alt="Your Logo" width="150" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item me-5">
                <NavLink className="nav-link" exact to="/" activeClassName="active">
                  Home
                </NavLink>
              </li>
              <li className="nav-item me-5">
                <NavLink className="nav-link" to="/about" activeClassName="active">
                  About
                </NavLink>
              </li>
              <li className="nav-item me-5">
                <NavLink className="nav-link" to="/all-products" activeClassName="active">
                  Products
                </NavLink>
              </li>
              <li className="nav-item me-5">
                <NavLink className="nav-link" to="/contact" activeClassName="active">
                  Contact
                </NavLink>
              </li>
              {!isAuthenticated && (
                <li className="nav-item me-5">
                  <NavLink className="nav-link" to="/register" activeClassName="active">
                    SignUp
                  </NavLink>
                </li>
              )}
            </ul>
            <div className="d-flex me-5">
              {isAuthenticated && (
                <div className="dropdown">
                  <button
                    className="btn btn-link text-secondary"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div className="avatar-circle">
                      <span className="initials">{getInitials(fullName)}</span>
                    </div>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/my-order">My Order</NavLink></li>
                    <li>
                      <button className="dropdown-item" onClick={logout}>Logout</button>
                    </li>
                  </ul>
                </div>
              )}
              <NavLink className="nav-link" to="/cart">
                <FaShoppingCart size={25} />
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;