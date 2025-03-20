import React, { useState } from "react";
import axios from "axios";
import "./AddEmployee.css";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://localhost:8081/employee";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    age: "",
    jobRole: "",
    nic: "",
    address: "",
    category: "",
    basicSalary: "",
  });

  const [errors, setErrors] = useState({}); // Track validation errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear error message when user starts typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  
  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.nic) newErrors.nic = "NIC number is required.";
    if (!formData.jobRole) newErrors.jobRole = "Job role is required.";
    if (!formData.basicSalary) newErrors.basicSalary = "Daily salary is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill all required fields.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    axios
      .post(`${BASE_URL}/add`, formData)
      .then((response) => {
        toast.success("Employee added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        toast.error("An error occurred while adding the employee.");
      });
  };


  const handleManageAttendanceClick = () => {
    navigate("/ManageAttendance"); // Navigate to Manage Attendance page
  };

  const handleManageEmployeeClick = () => {
    navigate("/EmployeeDashboard"); // Navigate to Manage Employee page
  };

  return (
    <div className="emp-dashboard-container">
         <ToastContainer /> {/* Add Toast Container for notifications */}
      {/* Header Bar with two buttons */}
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

      <div className="emp-employee-form-container">
        {/* Main Content */}
        <div className="emp-main-content">
          <h1 className="emp-title">Add New Employee</h1>
          <form onSubmit={handleSubmit} className="emp-employee-form">
            <div className="emp-required-field">
              <input
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                required
              />
              <FaExclamationCircle className="emp-required-icon" />
            </div>
            <div className="emp-required-field">
              <input
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                required
              />
              <FaExclamationCircle className="emp-required-icon" />
            </div>
            <div className="emp-required-field">
              <input
                name="phoneNumber"
                placeholder="Phone Number"
                onChange={handleChange}
                required
              />
              <FaExclamationCircle className="emp-required-icon" />
            </div>
            <div className="emp-required-field">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <FaExclamationCircle className="emp-required-icon" />
          </div>
            <input name="address" placeholder="Address" onChange={handleChange} />
            
            <select name="category" onChange={handleChange}>
              <option value="">--Select type--</option>
              <option value="Permanent">Permanent</option>
              <option value="Temporary">Temporary</option>
            </select>
            <input name="age" placeholder="Age" onChange={handleChange} />
            <div className="emp-required-field">
              <input
                name="nic"
                placeholder="NIC Number"
                onChange={handleChange}
                required
              />
              <FaExclamationCircle className="emp-required-icon" />
            </div>
            <div className="emp-required-field">
              <input
                name="jobRole"
                placeholder="Job Role"
                onChange={handleChange}
                required
              />
              <FaExclamationCircle className="emp-required-icon" />
            </div>
            <div className="emp-required-field">
              <input
                type="number"
                name="basicSalary"
                placeholder="Daily Salary (Rs.)"
                onChange={handleChange}
                required
                min="0"
                step="0.01"
              />
              <FaExclamationCircle className="emp-required-icon" />
            </div>
              <div className="emp-submit-container">
            <button type="submit" className="emp-add-btn">
              Save
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
