import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx";
import "./TransactionReport.css";

export default function TransactionReport() {
  const componentRef = useRef();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("/api/transactions/all")
      .then((res) => setTransactions(res.data))
      .catch((err) => alert(err.message));
  }, []);

  const generatePDF = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Transaction_Report",
    onAfterPrint: () => alert("PDF has been generated successfully!"),
  });

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(transactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, "Transaction_Report.xlsx");
  };

  return (
    <div className="containerf">
      <div className="report-container">
        <h2>Transaction Report</h2>

        {/* ONLY THIS PART WILL BE PRINTED */}
        <div ref={componentRef} className="print-section">
          <div className="title"><h2>Transaction Report</h2></div>
          <table className="table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Supplier Name</th>
                <th>Product</th>
                <th>Product Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((txn) => (
                  <tr key={txn.id}>
                    <td>{txn.id}</td>
                    <td>{txn.supplierName}</td>
                    <td>{txn.product}</td>
                    <td>{txn.productCategory}</td>
                    <td>{txn.price}</td>
                    <td>{txn.quantity}</td>
                    <td>{txn.totalAmount}</td>
                    <td>{new Date(txn.date).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-data">
                    No transactions available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="button-container">
          <button className="download-btn" onClick={generatePDF}>
            Download as PDF
          </button>
          <button className="download-btn" onClick={exportToExcel}>
            Download as Excel
          </button>
          <button className="back-btn" onClick={() => window.history.back()}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
