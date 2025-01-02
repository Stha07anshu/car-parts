import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import ProductCard from './ProductCard';
import { getAllProducts } from '../../api/Api';
import '../styles/ProductContainer2.css';
import Slider from './Slider';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Get state passed via navigate
  const { results, query } = location.state || {}; // Extract search results and query

  useEffect(() => {
    if (results) {
      // If search results are provided, use them
      setProducts(results);
      setLoading(false);
    } else {
      // Otherwise, fetch all products
      getAllProducts()
        .then((res) => {
          setProducts(res.data.products);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching products:', err);
          setLoading(false);
        });
    }
  }, [results]);

  return (
    <div className="all-products-page">
      <Container>
        <Slider/>
        {/* Heading Section */}
        <div className="section-heading">
          <h2>{query ? `Search Results for "${query}"` : 'All Products'}</h2>
          <p>
            {query
              ? `${products.length} result(s) found for "${query}".`
              : 'Discover our complete collection of products.'}
          </p>
        </div>

        {loading ? (
          <div className="loading-spinner">Loading...</div> // Show a spinner while loading
        ) : (
          <Row className="gy-4">
            {products.length > 0 ? (
              products.map((product) => (
                <Col lg="3" md="4" sm="6" xs="12" key={product._id} className="product-column">
                  <ProductCard
                    _id={product._id}
                    productImage={product.productImage}
                    productCategory={product.productCategory}
                    productName={product.productName}
                    productPrice={product.productPrice}
                    productRating={product.productRating}
                  />
                </Col>
              ))
            ) : (
              <div className="no-products-message">
                No products found. Try searching for something else.
              </div>
            )}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default AllProductsPage;
