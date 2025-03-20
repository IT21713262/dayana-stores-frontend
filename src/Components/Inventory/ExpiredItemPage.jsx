import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from 'axios';
import {FaMinus } from "react-icons/fa6";
import { FaCalendarTimes } from "react-icons/fa";

function LowStockItemPage() {
  const [expiredItems, setExpiredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/inventory/expired")
      .then((response) => {
        setExpiredItems(response.data);
        setLoading(false); // Data fetched successfully
      })
      .catch((error) => {
        console.error("Error fetching expired stocks:", error);
        setError("Failed to fetch expired items. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* Back Button */}
      <Link to='/InventoryDashboard' style={{ textDecoration: 'none' }}>
        <button style={{
          margin: "20px 20px",
          border: "none",
          padding: "10px 12px",
          backgroundColor: "#54B168",
          cursor: "pointer",
          borderRadius: "35px"
        }}>
          <IoMdArrowRoundBack style={{ fontSize: "24px", color: "white" }} />
        </button>
      </Link>

      {/* Page Title */}
      <h2 className='other-page-title'>
        Expired Items <FaCalendarTimes />
      </h2>
      <hr className='green-line' />

      {/* Show Loading Message */}
      {loading && <p style={{ textAlign: "center", color: "#888" }}>Loading expired items...</p>}

      {/* Show Error Message */}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      {/* Show Empty State if No Expired Items */}
      {!loading && expiredItems.length === 0 && !error && (
        <div style={{ textAlign: "center", marginTop: "120px" }}>
          <img src="/no-items-pic.jpg" alt="No Expired Items" style={{width: "270px", marginBottom: "10px" }} />
          <p style={{ color: "#888" }}>You have no expired items, everything's looking good.</p>
        </div>
      )}

      {/* Table Displaying Expired Items */}
      {!loading && expiredItems.length > 0 && (
        <div className='table-container'>
          <table className='item-table'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Expired On</th>
                <th>Days Since Expired</th>
                <th>Potential Loss</th>
              </tr>
            </thead>
            <tbody>
              {expiredItems.map((item) => (
                <tr key={item.item_id}>
                  <td>
                    <img
                      src={item.item_image || "/default-image.jpg"} // Fallback if no image
                      alt={item.item_name}
                      style={{ width: "50px", height: "50px", borderRadius: "4px" }}
                    />
                  </td>
                  <td>{item.item_name}</td>
                  <td>{item.expired_on}</td>
                  <td>{item.days_since_expired}</td>
                  <td><FaMinus color='red' /> Rs.{item.potential_loss?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default LowStockItemPage;
