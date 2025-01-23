import React, { useEffect, useState } from "react";
import "../styles/ProductDescription.css";
import { getSingleProduct, createOrder, createCart } from "../../api/Api"; // Adjust the import path as necessary
import { useParams, useNavigate } from "react-router-dom";
import Related from "./Related";

const ProductDescription = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("cashOnDelivery");
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Invalid product ID");
        setLoading(false);
        return;
      }

      try {
        const response = await getSingleProduct(id);
        if (response.data.success) {
          setProduct(response.data.product);
          setTotalPrice(response.data.product.productPrice);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (action) => {
    setQuantity((prevQuantity) => {
      if (action === "increase" && prevQuantity < 5) {
        return prevQuantity + 1;
      } else if (action === "decrease" && prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };

  const handleQuantityInputChange = (e) => {
    const newQuantity = Math.min(5, Math.max(1, Number(e.target.value)));
    setQuantity(newQuantity);
  };

  useEffect(() => {
    if (product) {
      setTotalPrice(product.productPrice * quantity);
    }
  }, [quantity, product]);

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  const handlePayment = async (payment_method) => {
    const url = "http://localhost:5000/api/esewa/create"; // Endpoint to create order
  
    const data = {
      id:'anshu',
      amount: totalPrice, // Amount to pay (total price from the cart)
      products: [{ product: "test", amount: totalPrice, quantity: quantity }], // Example product data
      payment_method, // Payment method ("esewa" or "cashOnDelivery")
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        esewaCall(responseData.formData); // Call the esewa payment gateway
      } else {
        console.error("Failed to fetch:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };
  
  // Function to initiate payment using Esewa's API
  const esewaCall = (formData) => {
    console.log("Form Data to be sent to Esewa:", formData);
  
    const path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form"; // Esewa payment URL
  
    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);
  
    // Add form data as hidden inputs to submit to Esewa
    for (const key in formData) {
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }
  
    // Append the form to the body and submit it
    document.body.appendChild(form);
    form.submit();
  };
  
  
  const handleOrderCreation = async () => {
    const data = {
      products: [{ productId: product._id, quantity: quantity }],
      totalAmount: totalPrice,
      paymentMethod: selectedPayment,
    };

    try {
      const response = await createOrder(data);
      if (response.data.success) {
        alert("Order created successfully!");
        navigate("/order/confirmation");
      } else {
        alert("Failed to create the order. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred while creating the order.");
    }
  };

  const handleAddToCart = async () => {
    const data = {
      productId: product._id,
      quantity: quantity,
    };

    try {
      const response = await createCart(data);
      if (response.data.success) {
        alert("Product added to cart!");
      } else {
        alert("Failed to add product to cart. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred while adding product to cart.");
    }
  };

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-image">
          <img
            src={`http://localhost:5000/products/${product.productImage}`}
            alt={product.productName}
            className="product-img"
          />
        </div>

        <div className="product-details">
          <h1>{product.productName}</h1>
          <div className="product-meta">
            <div className="rating">
              {"★".repeat(Math.floor(product.productRating))}
              {"☆".repeat(5 - Math.floor(product.productRating))}
            </div>
            <span className="stock-status">In Stock</span>
          </div>
          <h2>Rs {totalPrice}</h2>
          <p className="product-description">{product.productDescription}</p>

          <div className="quantity-control">
            <button onClick={() => handleQuantityChange("decrease")}>-</button>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityInputChange}
              min="1"
            />
            <button onClick={() => handleQuantityChange("increase")}>+</button>
          </div>

          <div className="payment-option">
            <h3>Select Payment Option</h3>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentOption"
                value="esewa"
                checked={selectedPayment === "esewa"}
                onChange={handlePaymentChange}
              />
              <label className="form-check-label">Esewa</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentOption"
                value="cashOnDelivery"
                checked={selectedPayment === "cashOnDelivery"}
                onChange={handlePaymentChange}
              />
              <label className="form-check-label">Cash on Delivery</label>
            </div>
          </div>

          <div className="action-buttons">
            <button className="buy-now" onClick={selectedPayment === "esewa" ? () => handlePayment("esewa") : handleOrderCreation}>
              {selectedPayment === "esewa" ? "Buy Now with Esewa" : "Buy Now"}
            </button>
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>

          <div className="delivery-info">
            <div className="delivery-option">
              <h3>🚚 Free Delivery</h3>
              <p>Enter your pin code to check delivery availability.</p>
            </div>
            <div className="delivery-option">
              <h3>🔄 30-Day Returns</h3>
              <p>Enjoy a hassle-free return policy for your purchases.</p>
            </div>
          </div>
        </div>
      </div>

      <section className="related-products">
        <Related />
      </section>
    </div>
  );
};

export default ProductDescription;
