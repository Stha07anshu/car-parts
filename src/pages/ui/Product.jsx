import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ProductCard from './ProductCard'; // Assuming ProductCard is in the same directory
import { getAllProducts } from '../../api/Api'; // Ensure this API utility is correct
import '../styles/Product.css'; // Import your CSS for custom styles

const Product = () => {
  const [bestSellingProducts, setBestSellingProducts] = useState([]);

  // Fetch products on component mount
  useEffect(() => {
    getAllProducts()
      .then((res) => {
        const fetchedProducts = res.data.products;
        // Filter only "Best Selling" products
        const filteredProducts = fetchedProducts.filter(
          (product) => product.productType === 'Best Selling'
        );
        setBestSellingProducts(filteredProducts);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
    <div className="product-container-2">
      <Container className="white-background-container">
        {/* Heading Section */}
        <div className="section-heading">
          <h2>Best Selling Products</h2>
        </div>

        {/* Display products */}
        <Row className="gx-0 gy-1"> {/* Enhanced spacing between products */}
          {bestSellingProducts.slice(0, 4).map((product) => ( /* Display only 8 products (optional) */
            <Col md="3" sm="6" key={product._id} className="product-column">
              <ProductCard
                _id={product._id}
                productImage={product.productImage}
                productCategory={product.productCategory}
                productName={product.productName}
                productPrice={product.productPrice}
                productRating={product.productRating}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Product;
