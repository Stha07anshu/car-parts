import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

// Import the logo image
import parts from "../assets/logo/Black-logo.png";

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="bg-black text-white py-4 mt-5">
        <div className="container">
          <div className="row">
            <a href="/" className="d-block mb-3">
              <img src={parts} alt="Your Logo" width="150" />
            </a>
            <div className="col-md-4">
              <h5>Gear Auto Suppliers</h5>
              <p>Address: Kathmandu 44600</p>
              <p>Email: gearsupport@gmail.com</p>
              <p>Phone: +977-9807654321</p>
            </div>
            <div className="col-md-4">
              <h5>Account</h5>
              <ul className="list-unstyled">
                <li><a href="/" className="text-white">My Account</a></li>
                <li><a href="/login" className="text-white">Login / Register</a></li>
                <li><a href="/cart" className="text-white">Cart</a></li>
                <li><a href="/shop" className="text-white">Shop</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Quick Link</h5>
              <ul className="list-unstyled">
                <li><a href="/privacy" className="text-white">Privacy Policy</a></li>
                <li><a href="/terms" className="text-white">Terms of Use</a></li>
                <li><a href="/faq" className="text-white">FAQ</a></li>
                <li><a href="/contact" className="text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <p className="text-center mt-4">© Copyright Anshu Shrestha, 2024. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
