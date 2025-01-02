import React, { useState, useEffect } from "react";
import "../styles/Slider.css"; // Import the CSS file for styling

import image1 from "../../assets/images/image1.png";
import image2 from "../../assets/images/image2.png";
import image3 from "../../assets/images/image3.png";
import { searchProducts } from "../../api/Api"; // Import the searchProducts API
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const images = [image1, image2, image3];
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        fetchSuggestions();
      } else {
        setSearchSuggestions([]);
      }
    }, 300); // Debounce API call by 300ms
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const fetchSuggestions = async () => {
    try {
      const response = await searchProducts(searchQuery);
      setSearchSuggestions(response.data.products || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error.response?.data || error.message);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await searchProducts(searchQuery);
      setSearchResults(response.data.products);
      navigate(`/all-products`, { state: { results: response.data.products, query: searchQuery } });
    } catch (error) {
      console.error("Error searching products:", error.response?.data || error.message);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.productName);
    setSearchSuggestions([]);
  };

  const handleCategoryClick = async (category) => {
    try {
      const response = await searchProducts(category);
      setSearchResults(response.data.products);
      navigate(`/all-products`, { state: { results: response.data.products, query: category } });
    } catch (error) {
      console.error("Error fetching category products:", error.response?.data || error.message);
    }
  };

  const highlightQuery = (text) => {
    if (!searchQuery) return text;
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? <span key={index} style={{ fontWeight: 'bold', color: 'blue' }}>{part}</span> : part
    );
  };

  return (
    <div className="slider-wrapper">
      <div className="categories">
        <ul>
          <li onClick={() => handleCategoryClick("Wheels")}>Wheels</li>
          <li onClick={() => handleCategoryClick("Carbon parts")}>Carbon parts</li>
          <li onClick={() => handleCategoryClick("Android player")}>Android player</li>
          <li onClick={() => handleCategoryClick("Audio System")}>Audio System</li>
          <li onClick={() => handleCategoryClick("Seat Cover")}>Seat Cover</li>
          <li onClick={() => handleCategoryClick("Lights")}>Lights</li>
          <li onClick={() => handleCategoryClick("Exhaust")}>Exhaust</li>
        </ul>
      </div>

      <div className="vertical-divider"></div>

      <div className="slider-container">
        <div className="search-bar">
          <form onSubmit={handleSearch} className="search-bar-form">
            <div className="search-bar-container">
              <input
                type="text"
                placeholder="I'm searching for..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <i className="fas fa-search"></i>
              </button>
            </div>
            {searchSuggestions.length > 0 && (
              <ul className="suggestions-list">
                {searchSuggestions.map((suggestion) => (
                  <li
                    key={suggestion._id}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {highlightQuery(suggestion.productName)} {/* Highlight matching query */}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>

        <div className="slider-image">
          <img src={images[currentImageIndex]} alt="Slideshow" />
        </div>
      </div>

      <div className="search-results">
        {searchResults.length > 0 ? (
          <div>
            <h3>Search Results for "{searchQuery}":</h3>
            <div className="product-list">
              {searchResults.map((product) => (
                <div key={product._id} className="product-item">
                  <img src={product.productImage} alt={product.productName} />
                  <p>{product.productName}</p>
                  <p>{product.productPrice}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Slider;
