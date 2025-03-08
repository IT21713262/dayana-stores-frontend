import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaShoppingCart } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { Sidebar} from './Sidebar';
import './navbar.css';
import logo from '../../Assets/Images/DayanaStoresLogo.png'

function OrderNavBar() {
  const [sidebar, setSidebar] = useState(false);

  function logout() {
    localStorage.removeItem("role");
    localStorage.removeItem("itsp_provider_id");
    alert("Logged out successfully!");
  }

  const toggleSidebar = () => setSidebar(!sidebar);

  return (
    <>
      {/* Top Navbar */}
      <div className="navbar">
        <button className="menu-bars" onClick={toggleSidebar} aria-label="Open Sidebar">
          <FaBars />
        </button>
        <img src={logo} alt="Logo" className="nav-logo" />
        <h2 className="nav-title">Shop all your grocery needs at Dayana Stores</h2>
        <div className="cart-container">
          <FaShoppingCart className="cart-icon" />
          <span className="cart-count">3</span> {/* Dynamic item count */}
        </div>
      </div>

      {/* Sidebar Menu */}
      <div className={`sidebar-box ${sidebar ? "open" : ""}`}>
        <button className="close-icon" onClick={toggleSidebar} aria-label="Close Sidebar">
          <AiOutlineClose />
        </button>
        <ul className="sidebar-items">
          {Sidebar.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <li key={index} className="sidebar-item">
                <Link to={item.path}>
                  <IconComponent />
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
          {/* Logout */}
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
