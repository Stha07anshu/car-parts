import React from 'react';
import '../styles/ProductCard.css'; // Import the CSS for styling
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';  // Import React Icons for stars

const ProductCard = (props) => {
  const { _id, productImage, productCategory, productName, productPrice, productRating } = props;

  // Function to render star icons
  const renderStars = (rating) => {
    const totalStars = 5; // Total number of stars
    let stars = [];

    // Render filled stars
    for (let i = 0; i < rating; i++) {
      stars.push(<FaStar key={`filled-${i}`} style={{ color: "#f9a826" }} />);
    }

    // Render empty stars
    for (let i = rating; i < totalStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} style={{ color: "#f9a826" }} />);
    }

    return stars;
  };

  return (
    <div className="container d-flex justify-content-center">
      <figure className="card card-product-grid card-lg">
        <a href="#" className="img-wrap" data-abc="true">
        <Link to={`/product/${_id}`} >
          <img src={`http://localhost:5000/products/${productImage}`} alt={productName} className="w-100" />
          </Link>
        </a>
        <figcaption className="info-wrap">
          <div className="row">
            <div className="col-md-15 col-xs-15">
              <a href="#" className="title" data-abc="true">
                {productName}
              </a>
              <div className="col-md-5 col-xs-3">
              <div className="stars-container">
                {renderStars(productRating)} {/* Render star icons */}
              </div>
            </div>
            <div className="col-md-10 col-xs-3 text-right">
                <span className="title" data-abc="true">
                  Nrs {productPrice}
                </span>
              </div>
            </div>
            
          </div>
        </figcaption>
        <div className="bottom-wrap">
          <Link to={`/product/${_id}`} >
            Buy now
          </Link>
        </div>
      </figure>
    </div>
  );
};

export default ProductCard;
