import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // Navigate to home page after 10 seconds
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [navigate]);

  return (
    <div style={styles.container}>
      <p style={styles.message}>
        Thank you for your purchase. Your payment was successful and your Delivery
        is being processed.
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Full viewport height
    backgroundColor: '#f8f9fa', // Light background color
  },
  message: {
    fontSize: '1.5rem', // Larger font size
    fontWeight: 'bold', // Bold text
    color: '#28a745', // Green color for success message
    textAlign: 'center',
    padding: '20px',
    border: '1px solid #28a745', // Border with the same color as text
    borderRadius: '5px',
    backgroundColor: '#ffffff', // White background for the message
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
  },
};

export default Success;
