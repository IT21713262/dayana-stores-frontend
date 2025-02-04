import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GenerateReport() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get("/api/transactions")
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  const downloadCSV = () => {
    const header = ["ID", "Supplier Name", "Product", "Amount", "Date"];
    const csvRows = [];
    csvRows.push(header.join(","));
    transactions.forEach((tx) => {
      const row = [
        tx.id,
        `"${tx.supplierName}"`,
        `"${tx.product}"`,
        tx.amount,
        tx.date
      ];
      csvRows.push(row.join(","));
    });
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "supplier_transactions_report.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#54B168", marginBottom: "20px" }}>Generate Report</h2>
      
      <div style={{ overflowX: "auto", marginBottom: "20px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #54B168" }}>
              <th style={{ padding: "8px" }}>ID</th>
              <th style={{ padding: "8px" }}>Supplier Name</th>
              <th style={{ padding: "8px" }}>Product</th>
              <th style={{ padding: "8px" }}>Amount</th>
              <th style={{ padding: "8px" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: "8px" }}>{tx.id}</td>
                <td style={{ padding: "8px" }}>{tx.supplierName}</td>
                <td style={{ padding: "8px" }}>{tx.product}</td>
                <td style={{ padding: "8px" }}>{tx.amount}</td>
                <td style={{ padding: "8px" }}>{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <button 
        onClick={downloadCSV} 
        style={{
          padding: "10px 20px",
          backgroundColor: "#54B168",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Download CSV Report
      </button>
    </div>
  );
}
