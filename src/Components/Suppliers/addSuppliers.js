// src/Components/Suppliers/assSuppliers.js
import React, { useState } from "react";
import axios from "axios";

export default function AddSuppliers() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState(""); // default is empty
  const [productsSupplied, setProductsSupplied] = useState("");

  const sendData = (e) => {
    e.preventDefault();
    const newSupplier = { name, address, contactNumber, email, category, productsSupplied };
    axios.post("/api/suppliers", newSupplier)
      .then(() => {
        alert("Supplier details added");
        window.location.replace("/suppliers");
      })
      .catch((err) => alert("Error: " + err));
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box"
  };

  const labelStyle = { marginBottom: "5px", display: "block", fontWeight: "bold" };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontFamily: "Arial, sans-serif"
    }}>
      <form onSubmit={sendData} style={{
        width: "450px",
        padding: "30px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        backgroundColor: "#fff"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#54B168" }}>
          Add New Supplier
        </h2>

        <div>
          <label htmlFor="name" style={labelStyle}>Supplier Name</label>
          <input 
            type="text" 
            id="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
            style={inputStyle} 
          />
        </div>

        <div>
          <label htmlFor="address" style={labelStyle}>Supplier Address</label>
          <input 
            type="text" 
            id="address" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required 
            style={inputStyle} 
          />
        </div>

        <div>
          <label htmlFor="contactNumber" style={labelStyle}>Contact Number</label>
          <input 
            type="text" 
            id="contactNumber" 
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required 
            style={inputStyle} 
          />
        </div>

        <div>
          <label htmlFor="email" style={labelStyle}>Supplier Email</label>
          <input 
            type="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            style={inputStyle} 
          />
        </div>

        <div>
          <label htmlFor="category" style={labelStyle}>Product Category</label>
          <select 
            id="category" 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
            required
          >
            <option value="" disabled>Select</option>
            <option value="Groceries">Groceries</option>
            <option value="Cosmetics">Cosmetics</option>
            <option value="Stationery">Stationery</option>
          </select>
        </div>

        <div>
          <label htmlFor="productsSupplied" style={labelStyle}>Products Supplied</label>
          <input 
            type="text" 
            id="productsSupplied" 
            value={productsSupplied}
            onChange={(e) => setProductsSupplied(e.target.value)}
            required 
            style={inputStyle} 
          />
        </div>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px"
        }}>
          <button 
            type="submit" 
            style={{
              backgroundColor: "#54B168",
              border: "none",
              borderRadius: "8px",
              color: "white",
              padding: "10px 20px",
              cursor: "pointer",
              flex: "1",
              marginRight: "10px"
            }}
          >
            Add Supplier
          </button>
          <button 
            type="button" 
            onClick={() => window.history.back()}
            style={{
              backgroundColor: "white",
              border: "2px solid #54B168",
              borderRadius: "8px",
              color: "#54B168",
              padding: "10px 20px",
              cursor: "pointer",
              flex: "1"
            }}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
