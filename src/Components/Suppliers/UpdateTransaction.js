import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import hooks for navigation
import "./UpdateTransaction.css"; // Import the CSS file

export default function UpdateTransaction() {
  const { id } = useParams(); // Get the transaction ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const token = localStorage.getItem("token");
  // State for form fields
  const [supplierName, setSupplierName] = useState("");
  const [product, setProduct] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [date, setDate] = useState("");

  useEffect(() => {
    // Fetch the transaction details from the backend
    axios.get(`/api/transactions/${id}`)
      .then((response) => {
        const transaction = response.data;
        setSupplierName(transaction.supplierName);
        setProduct(transaction.product);
        setProductCategory(transaction.productCategory);
        setPrice(transaction.price);
        setQuantity(transaction.quantity);
        setTotalAmount(transaction.totalAmount);
        setDate(transaction.date);
      })
      .catch((error) => {
        console.error("Error fetching transaction:", error);
      });
  }, [id]); // Fetch data whenever the transaction ID changes

  // Calculate total amount whenever price or quantity changes
  useEffect(() => {
    setTotalAmount(price * quantity);
  }, [price, quantity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTransaction = { supplierName, product, productCategory, price, quantity, totalAmount, date };

    axios.put(`/api/transactions/${id}`, updatedTransaction)
      .then(() => {
        alert("Transaction updated successfully");
        navigate("/supplierDashboard"); // Redirect back to dashboard
      })
      .catch((error) => {
        alert("Error updating transaction: " + error);
      });
  };

  return (
    <div className="update-transaction-container">
      <form onSubmit={handleSubmit} className="add-transaction-form">
        <h2>Update Transaction</h2>

        <div className="form-input">
          <label htmlFor="supplierName">Supplier Name</label>
          <input 
            type="text"
            id="supplierName"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            required
          />
        </div>

        <div className="form-input">
          <label htmlFor="product">Product</label>
          <input 
            type="text"
            id="product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
          />
        </div>

        <div className="form-input">
          <label htmlFor="productCategory">Product Category</label>
          <select
            id="productCategory"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select</option>
            <option value="Groceries">Groceries</option>
            <option value="Cosmetics">Cosmetics</option>
            <option value="Stationery">Stationery</option>
          </select>
        </div>

        <div className="form-input">
          <label htmlFor="price">Price</label>
          <input 
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>

        <div className="form-input">
          <label htmlFor="quantity">Quantity</label>
          <input 
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </div>

        <div className="form-input">
          <label htmlFor="totalAmount">Total Amount</label>
          <input 
            type="number"
            id="totalAmount"
            value={totalAmount}
            readOnly
          />
        </div>

        <div className="form-input">
          <label htmlFor="date">Date</label>
          <input 
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="add-transaction-buttons">
          <button type="submit" className="submit-btn">Update Transaction</button>
          <button type="button" onClick={() => navigate(-1)} className="back-btn">
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
