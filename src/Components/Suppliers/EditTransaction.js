import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditTransaction() {
  const [transaction, setTransaction] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/transactions/${id}`)
      .then((res) => setTransaction(res.data))
      .catch(err => console.error("Error fetching transaction:", err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/transactions/${id}`, transaction)
      .then(() => navigate("/supplierDashboard"))
      .catch(err => console.error("Error updating transaction:", err));
  };

  const handleInputChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  if (!transaction) return <div>Loading...</div>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Supplier Name:</label>
        <input type="text" name="supplierName" value={transaction.supplierName} onChange={handleInputChange} />
        <br />
        <label>Product:</label>
        <input type="text" name="product" value={transaction.product} onChange={handleInputChange} />
        <br />
        <label>Product Category:</label>
        <input type="text" name="productCategory" value={transaction.productCategory} onChange={handleInputChange} />
        <br />
        <label>Price:</label>
        <input type="number" name="price" value={transaction.price} onChange={handleInputChange} />
        <br />
        <label>Quantity:</label>
        <input type="number" name="quantity" value={transaction.quantity} onChange={handleInputChange} />
        <br />
        <label>Date:</label>
        <input type="date" name="date" value={new Date(transaction.date).toISOString().split('T')[0]} onChange={handleInputChange} />
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
