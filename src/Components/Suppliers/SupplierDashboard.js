import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SupplierDashboard() {
  const [supplierCount, setSupplierCount] = useState(0);
  const [recentSuppliers, setRecentSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get all suppliers; adjust this call if your API differs
    axios.get("/api/suppliers")
      .then(res => {
        const suppliers = res.data;
        setSupplierCount(suppliers.length);
        // Assume the most recent 5 suppliers (last 5 in the array)
        setRecentSuppliers(suppliers.slice(-5).reverse());
      })
      .catch(err => console.error("Error fetching suppliers:", err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#54B168", marginBottom: "20px" }}>
        Supplier Dashboard
      </h2>
      <div style={{ marginBottom: "20px" }}>
        <div style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          width: "250px",
          textAlign: "center",
          margin: "auto"
        }}>
          <h3>Total Suppliers</h3>
          <p style={{ fontSize: "24px", color: "#54B168" }}>{supplierCount}</p>
        </div>
      </div>
      <div style={{ marginBottom: "30px" }}>
        <h3>Recent Suppliers</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #54B168" }}>
              <th style={{ padding: "8px" }}>Name</th>
              <th style={{ padding: "8px" }}>Category</th>
            </tr>
          </thead>
          <tbody>
            {recentSuppliers.map(supplier => (
              <tr key={supplier.id} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: "8px" }}>{supplier.name}</td>
                <td style={{ padding: "8px" }}>{supplier.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <button 
          onClick={() => navigate("/addSupplier")} 
          style={{
            backgroundColor: "#54B168",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            cursor: "pointer"
          }}
        >
          Add Supplier
        </button>
        <button 
          onClick={() => navigate("/viewSuppliers")} 
          style={{
            backgroundColor: "#54B168",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            cursor: "pointer"
          }}
        >
          View Suppliers
        </button>
        <button 
          onClick={() => navigate("/searchSuppliers")} 
          style={{
            backgroundColor: "#54B168",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            cursor: "pointer"
          }}
        >
          Search Suppliers
        </button>
      </div>
    </div>
  );
}
