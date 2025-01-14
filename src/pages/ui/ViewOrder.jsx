import React, { useEffect, useState } from "react";
import "../styles/ViewOrder.css"; // Create a CSS file for styling
import { getAllOrders, deleteOrder } from "../../api/Api"; // Include the deleteOrder API call
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import the necessary CSS for toast

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

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await deleteOrder(orderId);
      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId)
        );
        toast.success("Order deleted successfully!"); // Display success toast
        setTimeout(() => {
          window.location.reload(); // Refresh the page after deletion
        }, 2000); // Wait for toast to appear before reloading
      } else {
        toast.error(response.data.message || "Failed to delete order.");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred while deleting the order.");
    }
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
              <div className="order-buttons-container">
                <button
                  className="view-details-btn"
                  onClick={() => handleViewOrderDetails(order._id)}
                >
                  View Details
                </button>
                <button
                  className="delete-order-btn"
                  onClick={() => handleDeleteOrder(order._id)}
                >
                  Delete Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
