// DeleteTransaction.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./DeleteTransaction.css";

export default function DeleteTransaction() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`/admin/transactions/${id}`,
        {headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token} `
        },}
      )
      .then((res) => setTransaction(res.data))
      .catch((err) => console.error("Error fetching transaction:", err));
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`/admin/transactions/${id}`,
        {headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token} `
        },}
      )
      .then(() => {
        alert("Transaction deleted successfully.");
        navigate("/supplierDashboard");
      })
      .catch((err) => console.error("Error deleting transaction:", err));
  };

  const handleCancel = () => {
    navigate("/supplierDashboard");
  };

  return (
    <div className="delete-transaction-container">
      <div className="delete-card">
        <h2>Delete Transaction</h2>
        {transaction ? (
          <>
            <p>
              Are you sure you want to delete the transaction with ID <strong>{transaction.id}</strong> for supplier <strong>{transaction.supplierName}</strong>?
            </p>
            <div className="delete-btn-group">
              <button className="delete-btn confirm" onClick={handleDelete}>
                Yes, Delete
              </button>
              <button className="delete-btn cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <p>Loading transaction details...</p>
        )}
      </div>
    </div>
  );
}
