import React, { useEffect, useState } from "react";
import "../styles/OrderDetails.css"; // Create a CSS file for styling
import { getSingleOrder,getSingleProduct } from "../../api/Api"; // Adjust the import path as necessary
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams(); // Fetch the order ID from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await getSingleOrder(id);
        if (response.data.success) {
            console.log(response.data);
          setOrder(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) return <p className="loading-text">Loading order details...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  return (
    <div className="order-details-container">
      <h1>Order Details</h1>
      {order && (
        <div className="order-details">
          <h2>Product</h2>
          <ul className="product-list">
            {order.products.map((product, index) => (
              <li key={index} className="product-item">
                <div className="product-image-container">
                  <img
                    src={`http://localhost:5000/products/${product.productId.productImage}`}
                    alt={product.productName}
                    className="product-image"
                  />
                </div>
                <div className="product-info">
                  <p><strong>Name:</strong> {product.productId.productName}</p>
                  <p><strong>Quantity:</strong> {product.quantity}</p>
                  <p><strong>Price:</strong> Rs {order.totalAmount}</p>
                  <p><strong>Description:</strong> {product.productId.productDescription}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
