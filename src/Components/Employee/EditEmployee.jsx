import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../NavBar";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewEmployee.css";

const BASE_URL = "http://localhost:8081/employee";

const EditEmployee = () => {
  const [employee, setEmployee] = useState(null);
  const [formData, setFormData] = useState({
    age: "",
    phoneNumber: "",
    email: "",
    jobRole: "",
    basicSalary: "",
  });
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
      // Set only the updatable fields in the state
      setFormData({
        age: response.data.age || "",
        phoneNumber: response.data.phoneNumber || "",
        email: response.data.email || "",
        jobRole: response.data.jobRole || "",
        basicSalary: response.data.basicSalary || "",
      });
    } catch (err) {
      console.error("Error fetching employee by ID:", err);
      setError("Failed to fetch employee details.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    if (employee) {
      navigate(`/update-employee/${employee.id}`);
    }
  };

  const handleSave = async () => {
    try {
      // Send only the updatable fields in the request
      const updatedData = {
        age: formData.age,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        jobRole: formData.jobRole,
        basicSalary: formData.basicSalary,
      };

      await axios.put(`${BASE_URL}/${id}`, updatedData);
      alert("Employee details updated successfully!");
      getEmployeeById(); // Refresh data after updating
    } catch (err) {
      console.error("Error updating employee details:", err);
      alert("Failed to update employee details.");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="header-bar">
        <NavBar />
        <h2 className="dashboard-title">Employee Management</h2>
        <div className="header-buttons">
          <button className="header-button">Manage Employee</button>
          <button className="header-button">Manage Attendance</button>
        </div>
      </div>
      <div className="employee-detail-container">
        <h1 className="title">Employee Details</h1>
        <form className="view-employee-form">
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" value={employee.firstName} readOnly />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" value={employee.lastName} readOnly />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Job Role:</label>
            <input type="text" name="jobRole" value={formData.jobRole} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <input type="text" value={employee.category} readOnly />
          </div>
          <div className="form-group">
            <label>NIC:</label>
            <input type="text" value={employee.nic} readOnly />
          </div>
          <div className="form-group">
            <label>Basic Salary:</label>
            <input type="number" name="basicSalary" value={formData.basicSalary} onChange={handleChange} />
          </div>
          <button type="button" onClick={handleUpdate} className="update-btn">
            Update
          </button>
          <button type="button" onClick={handleSave} className="save-btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
