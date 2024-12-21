import React from "react";
import Slider from "../ui/Slider"; // Import the Slider component
import "./Homepage.css"; // Import CSS for homepage styling
import Category from "../ui/Category";
import Ads from "../ui/Ads"; // Import the Ads component
import Featured from "../ui/Featured"; // Import the Featured component

const Homepage = () => {
  return (
    <div className="homepage-container">
      <section className="homepage-slider">
        <Slider />
      </section>

      <section className="homepage-content">
        <Category />
      </section>

      <section className="homepage-ads">
        <Ads /> {/* Displaying Ads component */}
      </section>

      <section className="homepage-featured">
        <Featured /> {/* Displaying Featured component */}
      </section>
    </div>
  );
};

export default Homepage;
