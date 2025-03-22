import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./DeleteSuppliers.css";

export default function DeleteSuppliers() {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);
  const navigate = useNavigate();
 const token = localStorage.getItem("token");
  useEffect(() => {
    fetchSupplierDetails();
  }, []);

  const fetchSupplierDetails = () => {
    axios.get(`/admin/suppliers/${id}`,
      {headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token} `
      },}
    )
      .then(res => setSupplier(res.data))
      .catch(err => console.error("Error fetching supplier:", err));
  };

  const handleDelete = () => {
    axios.delete(`/admin/suppliers/${id}`,
      {headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token} `
      },}
    )
      .then(() => {
        alert("Supplier deleted successfully.");
        navigate("/supplierDashboard");
      })
      .catch(err => console.error("Error deleting supplier:", err));
  };

  const handleCancel = () => {
    navigate("/supplierDashboard");
  };

  return (
    <div className="delete-container">
      {supplier ? (
        <div className="delete-box">
          <h2>Delete Supplier</h2>
          <p>Are you sure you want to delete the following supplier?</p>
          <div className="supplier-info">
            <p><strong>Name:</strong> {supplier.supplierName}</p>
            <p><strong>Email:</strong> {supplier.supplierEmail}</p>
            <p><strong>Contact:</strong> {supplier.supplierPhone}</p>
            <p><strong>Category:</strong> {supplier.productCategory}</p>
          </div>
          <div className="button-group">
            <button className="delete-btn" onClick={handleDelete}>Yes, Delete</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <p>Loading supplier details...</p>
      )}
    </div>
  );
}
