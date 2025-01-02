import React from "react";
import Slider from "../ui/Slider"; // Import the Slider component
import "./Homepage.css"; // Import CSS for homepage styling
import Category from "../ui/Category";
import Ads from "../ui/Ads"; // Import the Ads component
import Featured from "../ui/Featured"; // Import the Featured component
import Services from "../ui/Service";
import ProductContainer2 from "../ui/ProductContainer2";
import Product from "../ui/Product";

const Homepage = () => {
  return (
    <div className="homepage-container">
      {/* Slider Section */}
      <section className="homepage-slider">
        <Slider />
      </section>

      {/* Category Section */}
      <section className="homepage-category">
        <Category />
      </section>

      {/* Product Section 1 */}
      <section className="homepage-products">
        <Product />
      </section>

      {/* Ads Section */}
      <section className="homepage-ads">
        <Ads />
      </section>

      {/* Product Section 2 */}
      <section className="homepage-products-2">
        <ProductContainer2 />
      </section>

      {/* Featured Section */}
      <section className="homepage-featured">
        <Featured />
      </section>

      {/* Services Section */}
      <section className="homepage-services">
        <Services />
      </section>
    </div>
  );
};

export default Homepage;
