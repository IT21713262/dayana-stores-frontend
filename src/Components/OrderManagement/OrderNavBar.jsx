import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaShoppingCart } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { Sidebar } from './Sidebar';
import './navbar.css';
import logo from '../../Assets/Images/DayanaStoresLogo.png';

function OrderNavBar() {
  const [sidebar, setSidebar] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await fetch('http://localhost:8081/admin/cart/items', {
          headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const cartItems = await response.json();
        const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        setCartItemCount(totalQuantity);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };

    fetchCartCount();

    const interval = setInterval(fetchCartCount, 5000); // update every 5 seconds

    return () => clearInterval(interval);
  }, [token]);

  function logout() {
    localStorage.removeItem('role');
    localStorage.removeItem('itsp_provider_id');
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    navigate('/login');
  }

  const toggleSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className="order-navbar">
        <button className="menu-bars" onClick={toggleSidebar} aria-label="Open Sidebar">
          <FaBars />
        </button>
        <img src={logo} alt="Logo" className="nav-logo" />
        <h2 className="nav-title">Shop all your grocery needs at Dayana Stores</h2>
        <div className="cart-container">
          <Link to="/viewCart">
            <FaShoppingCart className="cart-icon" />
            <span className="cart-count">{cartItemCount}</span>
          </Link>
        </div>
      </div>

      <div className={`sidebar-box ${sidebar ? 'open' : ''}`}>
        <button className="close-icon" onClick={toggleSidebar} aria-label="Close Sidebar">
          <AiOutlineClose />
        </button>
        <ul className="sidebar-items">
          {Sidebar.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <li key={index} className="sidebar-item">
                <Link to={item.path} onClick={toggleSidebar}>
                  <IconComponent />
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
          <li className="sidebar-item">
            <Link to="/login" onClick={logout}>
              <MdLogout />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default OrderNavBar;
