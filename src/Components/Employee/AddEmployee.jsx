import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddEmployee.css";
import NavBar from "../NavBar";

const BASE_URL = "http://localhost:8081/employee";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    age: "",
    jobRole: "",
    nic:"",
    address: "",
    category: "",
    nicNumber: "",
    basicSalary: "",
  });

 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${BASE_URL}/add`, formData)
      .then(response => {
        console.log("Employee added successfully:", response.data);
      })
      .catch(error => {
        console.error("Error adding employee:", error);
      });
  };

  return (
    <div className="dashboard-container">
    {/* Header Bar with two buttons */}
    <div className="header-bar">
    <NavBar/>
      <h2 className="dashboard-title">Employee Management</h2>
      <div className="header-buttons">
        <button className="header-button">Manage Employee</button>
        <button className="header-button">Manage Attendance</button>
      </div>
    </div>
    <div className="employee-form-container">
    
      {/* Main Content */}
      <div className="main-content">
        <h1 className="title">Add New Employee</h1>
        <form onSubmit={handleSubmit} className="employee-form">
          <input name="firstName" placeholder="First Name" onChange={handleChange} />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} />
          <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
          <input name="address" placeholder="Address" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <select name="category" onChange={handleChange}>
            <option value="">--Select type--</option>
            <option value="Permanent">Permanent</option>
            <option value="Temporary">Temporary</option>
          </select>
          <input name="age" placeholder="Age" onChange={handleChange} />
          <input name="nic" placeholder="NIC Number" onChange={handleChange} />
          <input name="jobRole" placeholder="Job Role" onChange={handleChange} />
          <input name="basicSalary" placeholder="Basic Salary" onChange={handleChange} />
          <buuton-container/>
          <button type="submit" className="add-btn">Add Employee</button>
          <button type="button" className="back-btn">Back</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddEmployee;
