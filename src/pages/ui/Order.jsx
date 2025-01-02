import React from "react";
import "../styles/Order.css"; // Ensure to create a CSS file for styling
import { useNavigate } from "react-router-dom";

const OrderSuccess = ({ orderDetails }) => {
  const navigate = useNavigate();

  return (
    <div className="order-success-container">
      <div className="success-message">
        <h1>🎉 Order Placed Successfully! 🎉</h1>
        <p>Thank you for shopping with us! Your order has been placed successfully.</p>
      </div>

      {orderDetails && (
        <div className="order-summary">
          <h2>Order Summary</h2>
          <p><strong>Order ID:</strong> {orderDetails.id}</p>
          <p><strong>Total Amount:</strong> Rs {orderDetails.totalAmount}</p>
          <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>
          <ul>
            <strong>Products:</strong>
            {orderDetails.products.map((product, index) => (
              <li key={index}>
                {product.productName} - Quantity: {product.quantity} - Price: Rs {product.totalProductPrice}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="navigation-buttons">
        <button onClick={() => navigate("/")}>Go to Homepage</button>
        <button onClick={() => navigate("/my-order")}>View My Orders</button>
      </div>
    </div>
  );
};

export default OrderSuccess;
