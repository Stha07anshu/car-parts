import React, { useState, useEffect } from "react";
import "../styles/Category.css";

const categories = [
  { name: "Android screen", icon: "fas fa-desktop" },
  { name: "Wheels", icon: "fas fa-circle" },
  { name: "Audio System", icon: "fas fa-music" },
  { name: "360 Camera", icon: "fas fa-camera" },
  { name: "Light", icon: "fas fa-lightbulb" },
  { name: "Exhaust", icon: "fas fa-car-side" },
];

const Category = () => {
  const [visibleCategories, setVisibleCategories] = useState(categories);

  // Function to slide right (auto animation and right button click)
  const slideRight = () => {
    const firstCategory = visibleCategories.shift();
    setVisibleCategories([...visibleCategories, firstCategory]);
  };

  // Function to slide left (left button click)
  const slideLeft = () => {
    const lastCategory = visibleCategories.pop();
    setVisibleCategories([lastCategory, ...visibleCategories]);
  };

  // Auto-animation effect
  useEffect(() => {
    const interval = setInterval(slideRight, 3000); // Slide every 3 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [visibleCategories]);

  return (
    <div className="category-slider">
      <div className="category-header">
        <span className="small-blue-bookmark"></span>
        <h3>Category</h3>
      </div>
      <div className="header">
        <span className="blue-bookmark"></span>
      </div>
      <div className="slider">
        <button className="arrow-btn left" onClick={slideLeft}>
          <i className="fas fa-chevron-left"></i>
        </button>

        <div className="category-cards">
          {visibleCategories.map((category, index) => (
            <div key={index} className="category-card">
              <i className={category.icon}></i>
              <p>{category.name}</p>
            </div>
          ))}
        </div>

        <button className="arrow-btn right" onClick={slideRight}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Category;
