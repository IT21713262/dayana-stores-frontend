// src/Components/Suppliers/SupplierTransactions.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SupplierTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch transactions from your API endpoint
    axios.get("/api/transactions")
      .then((res) => {
        setTransactions(res.data);
        setFilteredTransactions(res.data);
      })
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredTransactions(transactions);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = transactions.filter((tx) =>
        tx.supplierId.toString().includes(term) ||
        (tx.supplierName && tx.supplierName.toLowerCase().includes(term))
      );
      setFilteredTransactions(filtered);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      axios.delete(`/api/transactions/${id}`)
        .then(() => {
          const updated = transactions.filter(tx => tx.id !== id);
          setTransactions(updated);
          setFilteredTransactions(updated);
        })
        .catch(err => console.error("Error deleting transaction:", err));
    }
  };

  const handleEdit = (id) => {
    // Navigate to the edit transaction page
    navigate(`/editTransaction/${id}`);
  };

  const handleViewInvoice = (id) => {
    // Navigate to the invoice view page
    navigate(`/viewInvoice/${id}`);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#54B168", marginBottom: "20px" }}>Supplier Transactions</h2>
      
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <input 
            type="text"
            placeholder="Search by Supplier ID or Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px",
              width: "300px",
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
          />
          <button 
            onClick={handleSearch}
            style={{
              padding: "8px 16px",
              marginLeft: "10px",
              backgroundColor: "#54B168",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Search
          </button>
        </div>
        <div>
          <button 
            onClick={() => navigate("/addTransaction")}
            style={{
              padding: "8px 16px",
              backgroundColor: "#54B168",
              color: "white",
              border: "none",
              borderRadius: "5px",
              marginRight: "10px",
              cursor: "pointer"
            }}
          >
            Add Transaction
          </button>
          <button 
            onClick={() => navigate("/generateReport")}
            style={{
              padding: "8px 16px",
              backgroundColor: "#54B168",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Generate Report
          </button>
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #54B168" }}>
            <th style={{ padding: "8px" }}>ID</th>
            <th style={{ padding: "8px" }}>Supplier Name</th>
            <th style={{ padding: "8px" }}>Product</th>
            <th style={{ padding: "8px" }}>Amount</th>
            <th style={{ padding: "8px" }}>Date</th>
            <th style={{ padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((tx) => (
            <tr key={tx.id} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={{ padding: "8px" }}>{tx.id}</td>
              <td style={{ padding: "8px" }}>{tx.supplierName}</td>
              <td style={{ padding: "8px" }}>{tx.product}</td>
              <td style={{ padding: "8px" }}>{tx.amount}</td>
              <td style={{ padding: "8px" }}>{tx.date}</td>
              <td style={{ padding: "8px" }}>
                <button 
                  onClick={() => handleEdit(tx.id)}
                  style={{
                    marginRight: "5px",
                    backgroundColor: "#54B168",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    cursor: "pointer"
                  }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(tx.id)}
                  style={{
                    marginRight: "5px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>
                <button 
                  onClick={() => handleViewInvoice(tx.id)}
                  style={{
                    backgroundColor: "#54B168",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    cursor: "pointer"
                  }}
                >
                  View Invoice
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
