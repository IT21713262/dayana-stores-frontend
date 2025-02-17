import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateSupplier.css"; // Import the CSS file

export default function UpdateSupplier() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [productsSupplied, setProductsSupplied] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    axios
      .get(`/api/suppliers/${id}`)
      .then((res) => {
        setName(res.data.supplierName || "");
        setAddress(res.data.supplierAddress || "");
        setContactNumber(res.data.supplierPhone || "");
        setEmail(res.data.supplierEmail || "");
        setCategory(res.data.productCategory || "");
        setProductsSupplied(res.data.productsSupplied || "");
      })
      .catch((err) => {
        console.error("Error fetching supplier:", err);
        alert("Failed to load supplier data.");
      });
  }, [id]);

  const sendData = (e) => {
    e.preventDefault();
    const updatedSupplier = {
      supplierName: name,
      supplierAddress: address,
      supplierPhone: contactNumber,
      supplierEmail: email,
      productCategory: category,
      productsSupplied: productsSupplied,
    };

    axios
      .put(`/api/suppliers/${id}`, updatedSupplier)
      .then(() => {
        alert("Supplier details updated successfully!");
        navigate("/supplierDashboard");
      })
      .catch((err) => {
        console.error("Error updating supplier:", err);
        alert("Error updating supplier: " + err);
      });
  };

  return (
    <div className="update-supplier-container">
      <form onSubmit={sendData} className="update-supplier-form">
        <h2>Update Supplier Details</h2>

        <div>
          <label htmlFor="name">Supplier Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="address">Supplier Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="text"
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Supplier Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Product Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select
            </option>
            <option value="Groceries">Groceries</option>
            <option value="Cosmetics">Cosmetics</option>
            <option value="Stationery">Stationery</option>
          </select>
        </div>

        <div>
          <label htmlFor="productsSupplied">Products Supplied</label>
          <input
            type="text"
            id="productsSupplied"
            value={productsSupplied}
            onChange={(e) => setProductsSupplied(e.target.value)}
            required
          />
        </div>

        <div className="button-container">
          <button type="submit" className="update-button">
            Update Supplier
          </button>
          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/supplierDashboard")}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
