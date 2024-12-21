import React, { useState, useEffect } from "react";
import "../styles/Slider.css"; // Import the CSS file for styling

// Import images from local assets folder
import image1 from "../../assets/images/image1.png";
import image2 from "../../assets/images/image2.png";
import image3 from "../../assets/images/image3.png";

const Slider = () => {
  // List of image URLs for the slideshow
  const images = [image1, image2, image3];

  // State to track the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to update the current image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slider-wrapper">
      {/* Categories Section */}
      <div className="categories">
        <ul>
          <li>Wheels</li>
          <li>Carbon parts</li>
          <li>Android player</li>
          <li>Audio System</li>
          <li>Seat Cover</li>
          <li>Lights</li>
          <li>Exhaust</li>
        </ul>
      </div>

      {/* Vertical Divider */}
      <div className="vertical-divider"></div>

      {/* Slider Image Section */}
      <div className="slider-container">
        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="I'm searching for..." />
          <button>
            <i className="fas fa-search"></i>
          </button>
        </div>

        {/* Slider Image */}
        <div className="slider-image">
          <img
            src={images[currentImageIndex]} // Use the current image from the state
            alt="Slideshow"
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;
