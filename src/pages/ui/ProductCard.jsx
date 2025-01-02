import React from 'react';
import '../styles/ProductCard.css'; // Ensure CSS is properly imported
import { Link } from 'react-router-dom';

const ProductCard = ({ _id, productImage, productName, productPrice, productRating }) => {
  return (
    <div className="product-card">
      {/* Product Image */}
      <Link to={`/product/${_id}`}>
        <img
          src={`http://localhost:5000/products/${productImage}`}
          alt={productName}
          className="product-image"
        />
      </Link>

      {/* Product Name */}
      <h3 className="product-name">
  {productName.length > 20 ? `${productName.slice(0, 20)}...` : productName}
</h3>


      {/* Product Price */}
      <p>Rs {productPrice}

      {/* Product Rating */}
      <div className="rating">
        {'★'.repeat(Math.floor(productRating))}
        {'☆'.repeat(5 - Math.floor(productRating))}
      </div>
      </p>
      {/* Buy Now Button */}
      <Link to={`/product/${_id}`} className="buy-now-button">
        Buy now
      </Link>
    </div>
  );
};

export default ProductCard;
