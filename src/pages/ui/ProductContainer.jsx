import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ProductCard from './ProductCard'; // Assuming ProductCard is in the same directory
import { getAllProducts } from '../../api/Api'; // Make sure this API utility is correct
import '../styles/ProductContainer.css'; // Import your CSS for custom styles

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [noProductsFound, setNoProductsFound] = useState(false);

  // Fetch products on component mount
  useEffect(() => {
    getAllProducts()
      .then((res) => {
        const fetchedProducts = res.data.products;
        setProducts(fetchedProducts);
        setSortedProducts(fetchedProducts);

        // Extract and set unique product categories
        const uniqueCategories = [...new Set(fetchedProducts.map((product) => product.productCategory))];
        setCategories(uniqueCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Run the filter and sort logic whenever the filter options change
  useEffect(() => {
    handleSortAndFilter();
  }, [sortOption, categoryFilter, cityFilter]);

  // Handle sorting and filtering logic
  const handleSortAndFilter = () => {
    let filteredProducts = [...products];

    // Filter by category
    if (categoryFilter) {
      filteredProducts = filteredProducts.filter(
        (product) => product.productCategory === categoryFilter
      );
    }

    // Filter by city
    if (cityFilter) {
      filteredProducts = filteredProducts.filter((product) => product.city === cityFilter);
    }

    // Sort by price
    if (sortOption === 'low') {
      filteredProducts.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortOption === 'high') {
      filteredProducts.sort((a, b) => b.productPrice - a.productPrice);
    }

    setSortedProducts(filteredProducts);
    setNoProductsFound(filteredProducts.length === 0); // If no products match the filters
  };

  return (
    <div className="product-container">
      <Container className="white-background-container">
        {/* Heading Section */}
        <div className="section-heading">
          <h2>This Month's Best Selling Products</h2>
        </div>

        {/* Featured Products - Show only 4 products in a row */}
        <Row>
          {sortedProducts.slice(0, 4).map((product) => (  // Limit to 4 products
            <Col md="3" sm="6" key={product._id} className="mb-4">  {/* Change md="3" for 4 columns */}
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

export default ProductContainer;
