import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderNavBar from './OrderNavBar';
import './OrderManagement.css';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const loadCartFromAPI = async () => {
      try {
        const response = await fetch('http://localhost:8081/cart/items');
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    loadCartFromAPI();
  }, []);

  const subTotal = cartItems.reduce(
    (total, item) => total + item.item.unit_price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch('http://localhost:8081/order/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // No body needed as your backend takes cart directly
      });
  
      if (!response.ok) {
        throw new Error('Order placement failed');
      }
  
      const data = await response.json();
      console.log('Order placed successfully:', data);
      setShowPopup(true);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
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
          {cartItems.map((cartItem) => (
            <div key={cartItem.id} className="order-item-card">
              <img
                src={cartItem.item.item_image}
                alt={cartItem.item.item_name}
                className="order-item-image"
              />
              <div className="order-item-details">
                <h3>{cartItem.item.item_name.toUpperCase()}</h3>
                <p className="order-item-description-label">QUANTITY</p>
                <p className="order-item-description">{cartItem.quantity}</p>
              </div>
              <div className="order-item-price">
                <h4>RS {cartItem.item.unit_price.toFixed(2)}</h4>
                <p>{cartItem.quantity} Qty</p>
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
