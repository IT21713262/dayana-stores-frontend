import React, { useState } from "react";
import axios from "axios";
import "./AddEmployee.css";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa"; // Import required icon from Font Awesome
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify

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
    nicNumber: "",
    basicSalary: "",
  });

  const navigate = useNavigate(); // Initialize navigate
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phoneNumber ||
      !formData.basicSalary ||
      !formData.jobRole ||
      !formData.nic
    ) {
      toast.error("Please fill all required fields.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // If all required fields are filled, submit the form
    axios
      .post(`${BASE_URL}/add`, formData)
      .then((response) => {
        console.log("Employee added successfully:", response.data);
        toast.success("Employee added successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
          // Refresh the page after a short delay to show the success message
          setTimeout(() => {
            window.location.reload(); // Reload the page after the toast message
          }, 1000); // Wait for 3 seconds before refreshing the page
        })
      .catch((error) => {
        console.error("Error adding employee:", error);
        toast.error("An error occurred while adding the employee.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
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
                name="emp-firstName"
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
                name="basicSalary"
                placeholder="Daily Salary"
                onChange={handleChange}
                required
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
