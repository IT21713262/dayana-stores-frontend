import React, { useState, useEffect } from 'react';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import OrderNavBar from './OrderNavBar';
import './OrderManagement.css';

const ViewCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('token');

  const loadCartFromAPI = async () => {
    try {
      const response = await fetch('http://localhost:8081/cart/items', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    loadCartFromAPI();
  }, [token]);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      await fetch(
        `http://localhost:8081/cart/update/${itemId}?quantity=${newQuantity}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      loadCartFromAPI();
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  const handleIncrement = (cartId) => {
    const item = cartItems.find((cartItem) => cartItem.id === cartId);
    if (item) {
      handleUpdateQuantity(item.item.item_id, item.quantity + 1);
    }
  };

  const handleDecrement = (cartId) => {
    const item = cartItems.find((cartItem) => cartItem.id === cartId);
    if (item && item.quantity > 1) {
      handleUpdateQuantity(item.item.item_id, item.quantity - 1);
    }
  };

  const handleDelete = async (cartId) => {
    try {
      await fetch(`http://localhost:8081/cart/remove/${cartId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      loadCartFromAPI();
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  const handleCheckout = () => {
    navigate('/place-order');
  };

  const subTotal = cartItems.reduce(
    (total, item) => total + item.item.unit_price * item.quantity,
    0
  );

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
                  <th>Item Image</th>
                  <th>Item Name</th>
                  <th>Unit Price (Rs.)</th>
                  <th>Quantity</th>
                  <th>Total Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cartItem) => (
                  <tr key={cartItem.id}>
                    <td>
                      <img
                        src={cartItem.item.item_image}
                        alt={cartItem.item.item_name}
                        width="80"
                      />
                    </td>
                    <td>{cartItem.item.item_name}</td>
                    <td>{cartItem.item.unit_price.toFixed(2)}</td>
                    <td>
                      <button
                        onClick={() => handleDecrement(cartItem.id)}
                        disabled={cartItem.quantity <= 1}
                      >
                        <FaMinus />
                      </button>
                      <span className="quantity-value">{cartItem.quantity}</span>
                      <button onClick={() => handleIncrement(cartItem.id)}>
                        <FaPlus />
                      </button>
                    </td>
                    <td>{(cartItem.item.unit_price * cartItem.quantity).toFixed(2)}</td>
                    <td>
                      <FaTrash
                        className="delete-icon"
                        onClick={() => handleDelete(cartItem.id)}
                      />
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
