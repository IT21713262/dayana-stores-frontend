import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "./EmployeeDashboard.css"; // Import CSS file
import NavBar from '../NavBar';

const BASE_URL = "http://localhost:8081/employee";

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ firstName: "", lastName: "", email: "", category: "" });
  const [editingEmployee, setEditingEmployee] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/list`);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`${BASE_URL}/${id}`); // Send DELETE request to the correct endpoint
      setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== id)); // Update the state
      alert("Employee deleted successfully.");
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("An error occurred while deleting the employee.");
    }
  };
  

  const handleView = (id) => {
    navigate(`/ViewEmployee/${id}`); // Redirect to the ViewEmployee page using useNavigate
  };


  const handleAdd = () => {
    navigate("/AddEmployee"); // Redirect to the Add Employee page
  };

  const handleEdit =  (id) => {
    navigate(`/EditEmployee/${id}`); 
  };


  

  return (
    <div className="dashboard-container">
      {/* Header Bar with two buttons */}
      <div className="header-bar">
        <NavBar />
        <h2 className="dashboard-title">Employee Management</h2>
        <div className="header-buttons">
          <button className="header-button">Manage Employee</button>
          <button className="header-button">Manage Attendance</button>
        </div>
      </div>

      {/* Add Employee Form */}
      <div className="form-container">
        <input
          type="text"
          placeholder="First Name"
          value={newEmployee.firstName}
          onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newEmployee.lastName}
          onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newEmployee.email}
          onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
        />
        <select
          value={newEmployee.category}
          onChange={(e) => setNewEmployee({ ...newEmployee, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="Permanent">Permanent</option>
          <option value="Temporary">Temporary</option>
        </select>
        <button onClick={handleAdd} className="add-button">Add Employee</button>
      </div>

      {/* Employee Table */}
      <table className="employee-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Category</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.category}</td>
              <td>{`${emp.firstName} ${emp.lastName}`}</td>
              <td>{emp.email}</td>
              <td className="action-buttons">
                <FaEye className="view-button" onClick={() => handleView(emp.id)} />
                <FaEdit className="edit-button" onClick={() => handleEdit(emp.id)} />
                <FaTrash className="delete-button" onClick={() => handleDelete(emp.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDashboard;
