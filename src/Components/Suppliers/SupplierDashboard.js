import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./SupplierDashboard.css";

export default function SupplierDashboard() {
  const [suppliers, setSuppliers] = useState([]);
  const [supplierSearch, setSupplierSearch] = useState("");
  const [transactions, setTransactions] = useState([]); 
  const [transactionSearch, setTransactionSearch] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchSuppliers();
    fetchTransactions(); 
  }, []);

  const fetchSuppliers = () => {
    axios.get("/admin/suppliers",
      {headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token} `
      },}
    )
      .then((res) => setSuppliers(res.data))
      .catch(err => console.error("Error fetching suppliers:", err));
  };

  const fetchTransactions = () => {
    axios.get("/admin/transactions/all",
      {headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token} `
      },}
    ) 
      .then((res) => setTransactions(res.data))
      .catch(err => console.error("Error fetching transactions:", err));
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.supplierName.toLowerCase().includes(supplierSearch.toLowerCase()) ||
    supplier.productCategory.toLowerCase().includes(supplierSearch.toLowerCase())
  );

  const filteredTransactions = transactions.filter(tx =>
    tx.supplierName.toLowerCase().includes(transactionSearch.toLowerCase()) ||
    tx.product.toLowerCase().includes(transactionSearch.toLowerCase())
  );

  const handleEditSupplier = (id) => navigate(`/updateSuppliers/${id}`);
  const handleViewSupplier = (id) => navigate(`/viewSupplier/${id}`);
  
  const handleDeleteSupplier = id => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      axios.delete(`/admin/suppliers/${id}`,
        {headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token} `
        },}
      )
        .then(() => setSuppliers(suppliers.filter(s => s.supplierId !== id)))
        .catch(err => console.error(err));
    }
  };

  const handleEditTransaction = id => navigate(`/UpdateTransaction/${id}`);
  const handleViewTransaction = id => navigate(`/viewTransaction/${id}`);
  const handleDeleteTransaction = id => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      axios.delete(`/admin/transactions/${id}`,
        {headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token} `
        },}
      )
        .then(() => setTransactions(transactions.filter(t => t.id !== id)))
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="dashboard-container">
      {/* Suppliers Section */}
      <div className="section-container">
        <h2 className="section-title">Suppliers</h2>
        <div className="search-add-container">
          <input 
            type="text"
            placeholder="Search suppliers..."
            value={supplierSearch}
            onChange={(e) => setSupplierSearch(e.target.value)}
            className="search-input"
          />
          <div>
            <button onClick={() => navigate("/addSuppliers")} className="action-button add-button">
              Add Supplier
            </button>
            <button onClick={() => navigate("/supplierReport")} className="action-button add-button">
              Generate Report
            </button>
          </div>
        </div>
        <table className="table-style">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Category</th>
              <th>Products Supplied</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.map(supplier => (
              <tr key={supplier.supplierId}>
                <td>{supplier.supplierName}</td>
                <td>{supplier.supplierAddress}</td>
                <td>{supplier.supplierPhone}</td>
                <td>{supplier.supplierEmail}</td>
                <td>{supplier.productCategory}</td>
                <td>{supplier.productsSupplied}</td>
                <td>
                  <button onClick={() => handleEditSupplier(supplier.supplierId)} className="edit-button">Edit</button>
                  <button onClick={() => handleViewSupplier(supplier.supplierId)} className="view-button">View</button>
                  <button onClick={() => handleDeleteSupplier(supplier.supplierId)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Supplier Transactions Section */}
      <div className="section-container">
        <h2 className="section-title">Supplier Transactions</h2>
        <div className="search-add-container">
          <input 
            type="text"
            placeholder="Search transactions..."
            value={transactionSearch}
            onChange={(e) => setTransactionSearch(e.target.value)}
            className="search-input"
          />
          <div>
            <button onClick={() => navigate("/addTransaction")} className="action-button add-button">
              Add Transaction
            </button>
            <button onClick={() => navigate("/transactionReport")} className="action-button add-button">
              Generate Report
            </button>
          </div>
        </div>
        <table className="table-style">
  <thead>
    <tr>
      <th>Transaction ID</th> {/* Updated column for Transaction ID */}
      <th>Supplier Name</th>
      <th>Product</th>
      <th>Product Category</th> {/* Added Product Category */}
      <th>Price</th> {/* Added Price */}
      <th>Quantity</th> {/* Added Quantity */}
      <th>Total Amount</th>
      <th>Date</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredTransactions.map(tx => (
      <tr key={tx.id}>
        <td>{tx.id}</td> {/* Transaction ID */}
        <td>{tx.supplierName}</td>
        <td>{tx.product}</td>
        <td>{tx.productCategory}</td> {/* Display Product Category */}
        <td>{tx.price}</td> {/* Display Price */}
        <td>{tx.quantity}</td> {/* Display Quantity */}
        <td>{tx.totalAmount}</td>
        <td>{tx.date}</td>
        <td>
          <button onClick={() => handleEditTransaction(tx.id)} className="edit-button">Edit</button>
          <button onClick={() => handleViewTransaction(tx.id)} className="view-button">View</button>
          <button onClick={() => handleDeleteTransaction(tx.id)} className="delete-button">Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
}
