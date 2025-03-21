import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderNavBar from './OrderNavBar';
import './OrderManagement.css';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCart);
  }, []);

  const subTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    localStorage.removeItem('cartItems');
    window.dispatchEvent(new Event('storage'));
    setShowPopup(true);
  };

  const handleContinueShopping = () => {
    setShowPopup(false);
    navigate('/ordermanagementdashboard');
  };

  return (
    <>
      <OrderNavBar />
      <div className="place-order-page">
        <h2>PLACE ORDER</h2>
        <hr />
        <h4>Order Details</h4>
        <div className="order-items-list">
          {cartItems.map((item) => (
            <div key={item.id} className="order-item-card">
              <img src={item.imageUrl} alt={item.name} className="order-item-image" />
              <div className="order-item-details">
                <h3>{item.name.toUpperCase()}</h3>
                <p className="order-item-description-label">DESCRIPTION</p>
                <p className="order-item-description">{item.description}</p>
              </div>
              <div className="order-item-price">
                <h4>RS {item.price.toFixed(2)}</h4>
                <p>{item.quantity} Qty</p>
              </div>
            </div>
          ))}
        </div>

        <hr />
        <div className="subtotal-section">
          <p>SUBTOTAL</p>
          <h3>{subTotal.toFixed(2)}</h3>
        </div>
        <button className="confirm-order-btn" onClick={handlePlaceOrder}>
          CONFIRM ORDER
        </button>

        {showPopup && (
  <div className="popup-overlay">
    <div className="order-confirm-popup">
      <img
        src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
        alt="Order Confirmed"
        className="popup-success-icon"
      />
      <h2 className="popup-title">Order Confirmed!</h2>
      <p className="popup-subtext">Your order has been placed successfully</p>
      <button className="continue-btn" onClick={handleContinueShopping}>
        Continue Shopping
      </button>
    </div>
  </div>
)}

      </div>
    </>
  );
};

export default PlaceOrder;
