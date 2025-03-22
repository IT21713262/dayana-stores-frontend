import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx";
import "./SupplierReport.css";

export default function SupplierReport() {
  const componentPDF = useRef();
  const [suppliers, setSuppliers] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("/admin/suppliers",
        {headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token} `
        },}
      )
      .then((res) => setSuppliers(res.data))
      .catch((err) => alert(err.message));
  }, []);

  const generatePDF = useReactToPrint({
      contentRef: componentPDF,
      documentTitle: "Supplier_Report",
      onAfterPrint: () => alert("PDF has been generated successfully!"),
    });
  

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(suppliers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Suppliers");
    XLSX.writeFile(workbook, "Supplier_Report.xlsx");
  };

  return (
    <div className="containerf">
      <div className="report-container">
        <h2>Supplier Report</h2>
        <div ref={componentPDF} className="table-container">
        <div className="title"><h2>Supplier Report</h2></div>
          <table className="table">
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>Address</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Products Supplied</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.length > 0 ? (
                suppliers.map((supplier) => (
                  <tr key={supplier.supplierId}>
                    <td>{supplier.supplierName}</td>
                    <td>{supplier.supplierAddress}</td>
                    <td>{supplier.supplierPhone}</td>
                    <td>{supplier.supplierEmail}</td>
                    <td>{supplier.productsSupplied}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    No suppliers available
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
