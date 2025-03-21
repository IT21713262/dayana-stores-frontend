import React, { useState, useEffect } from 'react';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import OrderNavBar from './OrderNavBar';
import './OrderManagement.css';

const ViewCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const loadCart = () => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCart);
  };

  useEffect(() => {
    loadCart();
    window.addEventListener('storage', loadCart);
    return () => window.removeEventListener('storage', loadCart);
  }, []);

  const updateCartStorage = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
  };

  const handleIncrement = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCartStorage(updatedCart);
  };

  const handleDecrement = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCartStorage(updatedCart);
  };

  const handleDelete = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    updateCartStorage(updatedCart);
  };

  const handleCheckout = () => {
    navigate('/place-order');
  };

  const subTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <OrderNavBar />
      <div className="view-cart-container">
        <h2>View Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Unit Price (Rs.)</th>
                  <th>Quantity</th>
                  <th>Total Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price.toFixed(2)}</td>
                    <td>
                      <button onClick={() => handleDecrement(item.id)} disabled={item.quantity <= 1}>
                        <FaMinus />
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button onClick={() => handleIncrement(item.id)}>
                        <FaPlus />
                      </button>
                    </td>
                    <td>{(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <FaTrash className="delete-icon" onClick={() => handleDelete(item.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-details">
              <p>
                Total distinct items: <strong>{cartItems.length}</strong>
              </p>
              <p>
                Sub Total: <strong>Rs. {subTotal.toFixed(2)}</strong>
              </p>
              <div className="total-card">
                <p>Total</p>
                <h3>Rs. {subTotal.toFixed(2)}</h3>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ViewCart;
