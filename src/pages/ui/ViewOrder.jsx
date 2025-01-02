import React, { useEffect, useState } from "react";
import "../styles/ViewOrder.css"; // Create a CSS file for styling
import { getAllOrders } from "../../api/Api"; // Adjust the path for your API calls
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        if (response.data.success) {
          setOrders(response.data.data);
          console.log(response.data)
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleViewOrderDetails = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) return <p className="loading-text">Loading your orders...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  return (
    <div className="my-orders-container">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p className="no-orders">You have not placed any orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <h2>Product Name: {order.products[0].productId.productName}</h2>
              <p><strong>Total Amount:</strong> Rs {order.totalAmount}</p>
              <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <button onClick={() => handleViewOrderDetails(order._id)}>
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
