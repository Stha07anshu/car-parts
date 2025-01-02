import React from "react";
import "./About.css";
import placeholderImage from "../../assets/images/Parts.jpg"; // Replace with actual image path
import autoPartsImage from "../../assets/images/Parts.jpg"; // Replace with actual image path

const About = () => {
  return (
    <div className="about-page">
      <div className="breadcrumb">Home / About</div>
      <div className="about-container">
        <div className="story-section">
          <h1>Our Story</h1>
          <p>
            Welcome to Gear Up Auto Supplier, your trusted partner for high-quality automotive parts and accessories in Nepal. 
            We specialize in providing durable and reliable products designed to meet the unique demands of Nepal's diverse driving conditions. 
            From rugged mountain terrains to busy city roads, our comprehensive range includes genuine spare parts, maintenance tools, and innovative solutions to enhance vehicle performance and longevity.
          </p>
          <p>
            Our mission is to revolutionize the automotive supply industry in Nepal by offering easy access to premium products while fostering trust and reliability. 
            We work closely with manufacturers and suppliers to ensure our inventory is stocked with the latest and most efficient solutions for all types of vehicles. 
            Whether you're a professional mechanic, a workshop owner, or a vehicle enthusiast, we are here to provide expert guidance and support at every step. 
            Together, let's gear up for a better, more connected, and safer driving experience in Nepal.
          </p>
        </div>
        <div className="image-section">
          <img src={autoPartsImage} alt="Auto Parts" />
        </div>
      </div>
      <div className="founder-section">
        <img src={placeholderImage} alt="Anshu Shrestha" className="founder-image" />
        <div className="founder-details">
          <h2>Anshu Shrestha</h2>
          <p>Founder & Chairman</p>
          <div className="social-links">
            <a href="#" className="social-icon">🔗</a>
            <a href="#" className="social-icon">🔗</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
