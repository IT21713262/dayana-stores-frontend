import React, { useState } from "react";
import axios from "axios";

export default function AddTransaction() {
  const [supplierName, setSupplierName] = useState("");
  const [product, setProduct] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = { supplierName, product, productCategory, amount, date };
    axios
      .post("/api/transactions", newTransaction)
      .then(() => {
        alert("Transaction added successfully");
        window.location.href = "/transactions"; // Redirect to transactions page
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
      <form onSubmit={handleSubmit} style={{
        width: "500px",
        padding: "30px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        backgroundColor: "#fff"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#54B168" }}>
          Add Transaction
        </h2>
        <div>
          <label htmlFor="supplierName" style={labelStyle}>Supplier Name</label>
          <input 
            type="text"
            id="supplierName"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="product" style={labelStyle}>Product</label>
          <input 
            type="text"
            id="product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="productCategory" style={labelStyle}>Product Category</label>
          <select
            id="productCategory"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
            style={inputStyle}
          >
            <option value="" disabled>Select</option>
            <option value="Groceries">Groceries</option>
            <option value="Cosmetics">Cosmetics</option>
            <option value="Stationery">Stationery</option>
          </select>
        </div>
        <div>
          <label htmlFor="amount" style={labelStyle}>Amount</label>
          <input 
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="date" style={labelStyle}>Date</label>
          <input 
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
            Add Transaction
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
