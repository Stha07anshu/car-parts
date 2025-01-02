import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ProductCard from './ProductCard'; // Assuming ProductCard is in the same directory
import { getAllProducts } from '../../api/Api'; // Ensure this API utility is correct
import '../styles/ProductContainer2.css'; // Import your CSS for custom styles

const ProductContainer2 = () => {
  const [normalProducts, setNormalProducts] = useState([]);

  // Fetch products on component mount
  useEffect(() => {
    getAllProducts()
      .then((res) => {
        const fetchedProducts = res.data.products;
        // Filter only "Normal" products
        const filteredProducts = fetchedProducts.filter(
          (product) => product.productType === 'Normal'
        );
        setNormalProducts(filteredProducts);
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
          <h2>Explore Our Normal Products</h2>
        </div>

        {/* Display 4 columns and 2 rows */}
        <Row className="gx-0 gy-1"> {/* Enhanced spacing between products */}
          {normalProducts.slice(0, 8).map((product) => ( /* Limit to 8 products (4 columns x 2 rows) */
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

export default ProductContainer2;
