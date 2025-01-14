import React, { useEffect, useState } from "react";
import "./css/AdminOrder.css"; // Create a CSS file for styling
import { getAllOrders, updateOrder } from "../../api/Api"; // Ensure `updateOrderStatus` API call is defined
import { useNavigate } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders(); // Fetch orders
        if (response.data.success) {
          setOrders(response.data.data);
          console.log(response.data);
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

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await updateOrder(orderId, { status: newStatus }); // Call the API to update the status
      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        alert("Order status updated successfully.");
      } else {
        alert("Failed to update order status.");
      }
    } catch (err) {
      console.error("Error updating status:", err.message);
      alert("An error occurred while updating the order status.");
    }
  };

  if (loading) return <p className="loading-text">Loading orders...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  return (
    <div className="admin-orders-container">
      <h1>All Orders</h1>
      {orders.length === 0 ? (
        <p className="no-orders">No orders have been placed yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <img
                src={`http://localhost:5000/products/${order.products[0].productId.productImage}`}
                alt={order.products[0].productId.productName}
                className="product-image-admin"
              />
              <p><strong>Product Name:</strong> {order.products[0].productId.productName}</p>
              <p><strong>Total Amount:</strong> Rs {order.totalAmount}</p>
              <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
              <p>
                <strong>Status:</strong>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
