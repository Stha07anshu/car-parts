import React from "react";
import "../styles/Featured.css";
import image1 from "../../assets/images/feature4.png";
import image2 from "../../assets/images/feature3.jpg";
import image3 from "../../assets/images/feature2.png";
import image4 from "../../assets/images/feature1.jpg";
import image5 from "../../assets/images/feature5.png";

const featuredItems = [
  {
    id: 1,
    size: "large",
    image: image1,
    title: "IronMan Lift Kit",
    description: "Lift your truck and keep on chasing summits",
  },
  {
    id: 2,
    size: "small1",
    image: image2,
    title: "Ambient Lighting",
    description: "Make your car interior pop with this lighting",
  },
  {
    id: 3,
    size: "small2",
    image: image3,
    title: "Car EyeQ",
    description: "High Performance LED Lights",
  },
  {
    id: 4,
    size: "small3",
    image: image4,
    title: "4Mil Ceramic Tint",
    description: "High Performance Tint",
  },
  {
    id: 5,
    size: "small4", // Change to small-item4
    image: image5,
    title: "Premium car Perfume",
    description: "Makes your car always smell good",
  },
];

const Featured = () => {
  return (
    <section className="featured-section">
      <h4 className="featured-label">Featured</h4>
      <h1 className="coming-soon">Coming Soon</h1>
      <div className="featured-grid">
        {featuredItems.map((item) => (
          <div key={item.id} className={`featured-item ${item.size}`}>
            <img
              src={item.image}
              alt={item.title}
              className="featured-image"
            />
            <div className="featured-text">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Featured;
