import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf"; // For generating PDF
import './ViewTransaction.css'; // Import the CSS file

export default function ViewTransaction() {
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null); // State to handle errors
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios.get(`/admin/transactions/${id}`,
      {headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token} `
      },}
    )
      .then((res) => {
        if (res.data) {
          setTransaction(res.data);
        } else {
          setError("Transaction not found.");
        }
      })
      .catch((err) => {
        setError("Error fetching transaction: " + err.message);
      });
  }, [id]);

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(15);
    doc.text("Transaction Invoice", 10, 10);
    doc.setFontSize(12);
    doc.text(`Supplier Name: ${transaction.supplierName}`, 10, 20);
    doc.text(`Product: ${transaction.product}`, 10, 30);
    doc.text(`Product Category: ${transaction.productCategory}`, 10, 40);
    doc.text(`Price: $${transaction.price}`, 10, 50);
    doc.text(`Quantity: ${transaction.quantity}`, 10, 60);
    doc.text(`Total Amount: $${transaction.totalAmount}`, 10, 70);
    doc.text(`Date: ${new Date(transaction.date).toISOString().split('T')[0]}`, 10, 80);
    doc.save(`TransactionInvoice_${transaction.id}.pdf`);
  };

  const handleGoBack = () => {
    navigate("/supplierDashboard");
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!transaction) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Transaction Invoice</h2>
        <div className="details">
          <p className="info"><strong className="strong">Supplier Name:</strong> {transaction.supplierName}</p>
          <p className="info"><strong className="strong">Product:</strong> {transaction.product}</p>
          <p className="info"><strong className="strong">Product Category:</strong> {transaction.productCategory}</p>
          <p className="info"><strong className="strong">Price:</strong> ${transaction.price}</p>
          <p className="info"><strong className="strong">Quantity:</strong> {transaction.quantity}</p>
          <p className="info"><strong className="strong">Total Amount:</strong> ${transaction.totalAmount}</p>
          <p className="info"><strong className="strong">Date:</strong> {new Date(transaction.date).toISOString().split('T')[0]}</p>
        </div>
        <div className="button-container">
          <button onClick={handleDownloadPdf} className="button download-button">Download PDF</button>
          <button onClick={handleGoBack} className="button">Go Back</button>
        </div>
      </div>
    </div>
  );
}
