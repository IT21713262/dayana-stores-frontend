import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddSuppliers.css"; // Import the CSS file

export default function AddSuppliers() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [productsSupplied, setProductsSupplied] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const sendData = async (e) => {
    e.preventDefault();

    const newSupplier = {
      supplierName: name,
      supplierAddress: address,
      supplierPhone: contactNumber,
      supplierEmail: email,
      productCategory: category,
      productsSupplied: productsSupplied,
    };

    console.log("Sending data:", newSupplier);

    try {
      await axios.post("/admin/suppliers", newSupplier , 
        {headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token} `
        },}
      );
      alert("Supplier details added successfully!");
      window.location.replace("http://localhost:3000/supplierDashboard");
    } catch (err) {
      if (err.response) {
        console.error("Error response:", err.response.data);
        alert("Error from server: " + JSON.stringify(err.response.data));
      } else if (err.request) {
        console.error("No response received:", err.request);
        alert("No response received from server.");
      } else {
        console.error("Error setting up request:", err.message);
        alert("Error: " + err.message);
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={sendData} className="form-container">
        <h2 className="form-title">Add New Supplier</h2>

        <div>
          <label htmlFor="name" className="label">Supplier Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="input" />
        </div>

        <div>
          <label htmlFor="address" className="label">Supplier Address</label>
          <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required className="input" />
        </div>

        <div>
          <label htmlFor="contactNumber" className="label">Contact Number</label>
          <input type="text" id="contactNumber" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required className="input" />
        </div>

        <div>
          <label htmlFor="email" className="label">Supplier Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input" />
        </div>

        <div>
          <label htmlFor="category" className="label">Product Category</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required className="input">
            <option value="" disabled>Select</option>
            <option value="Groceries">Groceries</option>
            <option value="Cosmetics">Cosmetics</option>
            <option value="Stationery">Stationery</option>
          </select>
        </div>

        <div>
          <label htmlFor="productsSupplied" className="label">Products Supplied</label>
          <input type="text" id="productsSupplied" value={productsSupplied} onChange={(e) => setProductsSupplied(e.target.value)} required className="input" />
        </div>

        <div className="button-group">
          <button type="submit" className="btn submit-btn">Add Supplier</button>
          <button type="button" onClick={() => window.history.back()} className="btn back-btn">Back</button>
        </div>
      </form>
    </div>
  );
}
