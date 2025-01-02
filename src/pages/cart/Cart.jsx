import React, { useState, useEffect } from "react";
import "./Cart.css";
import { createCart, getAllCarts, updateCartItem, deleteCartItem, createOrder } from "../../api/Api";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState('cashOnDelivery'); // Default to "Cash on Delivery"
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getAllCarts();
        if (response.data.success) {
          setCartItems(response.data.data.items);
        }
      } catch (err) {
        console.error("Error fetching cart items:", err);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = async (id, newQuantity) => {
    try {
      const updatedQuantity = Math.max(1, parseInt(newQuantity, 10));
      if (updatedQuantity <= 0) return;

      const updatedData = {
        quantity: updatedQuantity,
        productId: id
      };

      const response = await updateCartItem(id, updatedData);
      if (response.data.success) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item._id === id ? { ...item, quantity: updatedQuantity } : item
          )
        );
      } else {
        console.error("Failed to update the cart item:", response.data.message);
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteCartItem(id);
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleCouponApply = () => {
    if (couponCode.toUpperCase() === "GAS") {
      setDiscount(5);
    } else {
      setDiscount(0);
    }
  };

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0);

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal - (subtotal * discount) / 100;
  };

  const goToShop = () => {
    navigate("/");
  };

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const handleCheckout = async () => {
    if (!selectedPayment) {
      alert("Please provide a payment method.");
      return;
    }

    const orderData = {
      products: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      })),
      totalAmount: calculateTotal(),
      paymentMethod: selectedPayment
    };

    try {
      const response = await createOrder(orderData);
      if (response.data.success) {
        alert("Order created successfully!");
        navigate("/order/confirmation");
      } else {
        alert("Failed to create the order. Please try again.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Error occurred while creating the order.");
    }
  };

  return (
    <div className="cart-page">
      <div className="breadcrumb">Home / Cart</div>
      <div className="cart-container">
        <div className="cart-table">
          <div className="cart-header">
            <div>Image</div>
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Action</div>
          </div>
          {cartItems.map((item) => (
            <div key={item._id} className="cart-row">
              <div className="product-image-cart">
                <img
                  src={`http://localhost:5000/products/${item.productImage}`}
                  alt={item.productName}
                />
              </div>
              <div className="product-name">{item.productName}</div>
              <div className="product-price">Rs {item.productPrice.toLocaleString()}</div>
              <div className="product-quantity">
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    handleQuantityChange(item._id, e.target.value)
                  }
                />
              </div>
              <div className="product-action">
                <button
                  className="delete-button"
                  onClick={() => handleDeleteItem(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div className="cart-actions">
            <button className="return-button" onClick={goToShop}>
              Return To Shop
            </button>
          </div>
        </div>
        <div className="cart-summary">
          <div className="coupon-section">
            <input
              type="text"
              placeholder="Coupon Code"
              className="coupon-input"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button className="apply-coupon" onClick={handleCouponApply}>
              Apply Coupon
            </button>
          </div>
          <div className="cart-total">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span>Rs {calculateSubtotal().toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="discount">
                <span>Discount (5%):</span>
                <span>- Rs {(calculateSubtotal() * discount) / 100}</span>
              </div>
            )}
            <div className="shipping">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="total">
              <span>Total:</span>
              <span>Rs {calculateTotal().toLocaleString()}</span>
            </div>
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

          <button className="checkout-button" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
