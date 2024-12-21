import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import parts from "../assets/logo/White-logo.png";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container-fluid">
          {/* Move logo a little to the right */}
          <a className="navbar-brand ms-3" href="/">
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
            {/* Center the nav items */}
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink 
                  className="nav-link" 
                  exact 
                  to="/" 
                  activeClassName="active"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  className="nav-link" 
                  to="/about" 
                  activeClassName="active"
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  className="nav-link" 
                  to="/contact" 
                  activeClassName="active"
                >
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  className="nav-link" 
                  to="/register" 
                  activeClassName="active"
                >
                  SignUp
                </NavLink>
              </li>
            </ul>
            {/* Icons a little to the left */}
            <div className="d-flex me-3">
              <NavLink className="nav-link" to="/profile">
                <FaUser size={20} />
              </NavLink>
              <NavLink className="nav-link" to="/cart">
                <FaShoppingCart size={20} />
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
