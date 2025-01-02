import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ProductCard from './ProductCard'; // Assuming ProductCard is in the same directory
import { getAllProducts } from '../../api/Api'; // Ensure this API utility is correct
import '../styles/Related.css'; // Import your CSS for custom styles

const Related = () => {
  const [products, setProducts] = useState([]);
  
  // Function to shuffle the products array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Function to remove duplicates based on productId
  const removeDuplicates = (array) => {
    return array.filter((value, index, self) => 
      index === self.findIndex((t) => (
        t._id === value._id
      ))
    );
  };

  // Fetch products on component mount
  useEffect(() => {
    getAllProducts()
      .then((res) => {
        let fetchedProducts = res.data.products;

        // Remove duplicates before shuffling
        fetchedProducts = removeDuplicates(fetchedProducts);

        // Shuffle the products
        const shuffledProducts = shuffleArray(fetchedProducts);
        
        setProducts(shuffledProducts);
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
          <h2>Related Products</h2>
        </div>

        {/* Display 4 columns and 2 rows */}
        <Row className="gx-0 gy-1"> {/* Enhanced spacing between products */}
          {products.slice(0, 4).map((product) => ( /* Limit to 4 products */
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

export default Related;
