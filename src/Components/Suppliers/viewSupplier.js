import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './ViewSupplier.css'; // Import the CSS file

export default function ViewSupplier() {
  const [supplier, setSupplier] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios.get(`/api/suppliers/${id}`)
      .then((res) => {
        setSupplier(res.data);
      })
      .catch((err) => {
        console.error("Error fetching supplier:", err);
        alert("Failed to load supplier details.");
      });
  }, [id]);

  if (!supplier) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Supplier Details</h2>
        <div>
          <h3 className="name">{supplier.supplierName}</h3>
          <p className="info"><strong className="strong">Address:</strong> {supplier.supplierAddress}</p>
          <p className="info"><strong className="strong">Contact Number:</strong> {supplier.supplierPhone}</p>
          <p className="info"><strong className="strong">Email:</strong> {supplier.supplierEmail}</p>
          <p className="info"><strong className="strong">Product Category:</strong> {supplier.productCategory}</p>
          <p className="info"><strong className="strong">Products Supplied:</strong> {supplier.productsSupplied}</p>
        </div>
        <div className="button-container">
          <button
            onClick={() => navigate("/supplierDashboard")}
            className="button"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
