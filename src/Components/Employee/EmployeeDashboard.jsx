import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS
import "./EmployeeDashboard.css";
import NavBar from '../NavBar';

const BASE_URL = "http://localhost:8081/employee";

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/list`);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to fetch employees.");
    }
  };

  const handleDelete = (id) => {
    // Show a confirmation toast with buttons
    const confirmToast = toast.info(
      <div className="emp-confirmation-toast">
        <p>Are you sure you want to delete this employee?</p>
        <div className="emp-confirmation-buttons">
          <button onClick={() => confirmDeletion(id, confirmToast)} className="emp-confirm-btn">Yes</button>
          <button onClick={() => toast.dismiss(confirmToast)} className="emp-cancel-btn">No</button>
        </div>
      </div>,
      {
        position: "top-center", // Position toast in the center
        autoClose: false, // Don't auto-close until user takes action
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        className: "confirmation-toast-container",
      }
    );
  };
  
  const confirmDeletion = async (id, confirmToast) => {
    try {
      await axios.delete(`${BASE_URL}?id=${id}`);
      setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== id));
      toast.dismiss(confirmToast); // Close the confirmation toast
      toast.success("Employee deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.dismiss(confirmToast); // Close the confirmation toast
      toast.error("An error occurred while deleting the employee.");
    }
  };
  
  

  const handleNavigation = (path) => {
    navigate(path);
  };

  const filteredEmployees = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "" || emp.category === selectedCategory)
  );

  return (
    <div className="emp-dashboard-container">
     <ToastContainer /> {/* Add Toast Container for notifications */}
      <div className="emp-header-bar">
        <NavBar />
        <h2 className="emp-dashboard-title">Employee Management</h2>
        <div className="emp-header-buttons">
          <button className="emp-header-button" onClick={() => handleNavigation('/ManageAttendance')}>
            Manage Attendance
          </button>
        </div>
      </div>

      <div className="emp-filter-container">
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="emp-category-filter">
          <option value="">All Categories</option>
          <option value="Permanent">Permanent</option>
          <option value="Temporary">Temporary</option>
        </select>
        <button onClick={() => handleNavigation('/AddEmployee')} className="emp-add-button">Add Employee</button>
      </div>

      <table className="emp-employee-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Job Role</th>
            <th>Name</th>
            <th>Email</th>
            <th>Monthly Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.jobRole}</td>
                <td>{`${emp.firstName} ${emp.lastName}`}</td>
                <td>{emp.email}</td>
                <td>{`Rs. ${emp.monthlySalary.toLocaleString()}`}</td>
                <td className="emp-action-buttons">
                  <FaEye className="emp-view-button" onClick={() => handleNavigation(`/ViewEmployee/${emp.id}`)} />
                  <FaEdit className="emp-edit-button" onClick={() => handleNavigation(`/EditEmployee/${emp.id}`)} />
                  <FaTrash className="emp-delete-button" onClick={() => handleDelete(emp.id)} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDashboard;
