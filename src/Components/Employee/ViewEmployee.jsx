import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../NavBar";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewEmployee.css";

const BASE_URL = "http://localhost:8081/employee";

const ViewEmployee = () => {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getEmployeeById();
  }, [id]);

  const getEmployeeById = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      setEmployee(response.data);
    } catch (err) {
      console.error("Error fetching employee by ID:", err);
      setError("Failed to fetch employee details.");
    }
  };

  // Display error message if the API call failed
  if (error) {
    return <div>{error}</div>;
  }

  // Render a loading state until the employee data is available
  if (!employee) {
    return <div>Loading...</div>;
  }

  const handleManageAttendanceClick = () => {
    navigate('/ManageAttendance'); // Navigate to Manage Attendance page
  };


   
  const handleManageEmployeeClick = () => {
    navigate('/EmployeeDashboard'); // Navigate to Manage Employee page
  };
  
  return (
    <div className="emp-dashboard-container">
      <div className="emp-header-bar">
        <NavBar />
        <h2 className="emp-dashboard-title">Employee Management</h2>
        <div className="emp-header-buttons">
        <button className="emp-header-button" onClick={handleManageEmployeeClick}>
            Manage Employee
          </button>
          <button className="emp-header-button" onClick={handleManageAttendanceClick}>
            Manage Attendance
          </button>
        </div>
      </div>
      <div className="emp-employee-detail-container">
        <h1 className="emp-title">Employee Details</h1>
        <form className="emp-view-employee-form">
          <div className="emp-form-group">
            <label>First Name:</label>
            <input type="text" value={employee.firstName} readOnly />
          </div>
          <div className="emp-form-group">
            <label>Last Name:</label>
            <input type="text" value={employee.lastName} readOnly />
          </div>
          <div className="emp-form-group">
            <label>Phone:</label>
            <input type="text" value={employee.phoneNumber} readOnly />
          </div>
          <div className="emp-form-group">
            <label>Email:</label>
            <input type="email" value={employee.email} readOnly />
          </div>
          <div className="emp-form-group">
            <label>Age:</label>
            <input type="number" value={employee.age} readOnly />
          </div>
          <div className="emp-form-group">
            <label>Address:</label>
            <input type="text" value={employee.address} readOnly />
          </div>
          <div className="emp-form-group">
            <label>Job Role:</label>
            <input type="text" value={employee.jobRole} readOnly />
          </div>
          <div className="emp-form-group">
            <label>Category:</label>
            <input type="text" value={employee.category} readOnly />
          </div>
          <div className="emp-form-group">
            <label>NIC:</label>
            <input type="text" value={employee.nic} readOnly />
          </div>
          <div className="emp-form-group">
          <label>Daily Salary:</label>
          <input 
            type="text" 
            value={`Rs. ${employee.basicSalary}`} 
            readOnly 
          />
        </div>
        </form>
      </div>
    </div>
  );
};

export default ViewEmployee;
