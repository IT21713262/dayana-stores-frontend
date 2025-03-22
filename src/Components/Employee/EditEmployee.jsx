import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../NavBar";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewEmployee.css";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS


const BASE_URL = "http://localhost:8081/admin/employee";

const EditEmployee = () => {
  const [employee, setEmployee] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
    email: "",
    jobRole: "",
    basicSalary: "",
    address: "", // Include address in the form state
    nic:"",
    category:""
  });
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    getEmployeeById();
  }, [id]);

  const getEmployeeById = async () => {
    try {
      // const response = await axios.get(`${BASE_URL}/${id}`);
      const response = await axios.get(`${BASE_URL}/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`, // Example: Add an auth token
          "Content-Type": "application/json",
        },
      });      
      setEmployee(response.data);
      setFormData({
        firstName:response.data.firstName || "",
        lastName:response.data.lastName || "",
        age: response.data.age || "",
        phoneNumber: response.data.phoneNumber || "",
        email: response.data.email || "",
        jobRole: response.data.jobRole || "",
        basicSalary: response.data.basicSalary || "",
        address: response.data.address || "", // Ensure address is populated
        nic: response.data.nic || "" ,
        category:response.data.category || ""
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

  const handleSave = async () => {
    try {
      // Include the employee id in the request payload
      const updatedData = {
     
        id: employee.id,  // Ensure the ID is included
        firstName:formData.firstName,
        lastName:formData.lastName,
        age: formData.age,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        jobRole: formData.jobRole,
        basicSalary: formData.basicSalary,
        nic: formData.nic,
        category:formData.category
      };
  
      // await axios.post(`${BASE_URL}/add`, updatedData); // Use POST instead of PUT
      // toast.success("Employee details updated successfully!", { // Show success popup
      //   position: "top-right",
      //   autoClose: 3000, // Auto close after 3 seconds
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      // });
      await axios.post(`${BASE_URL}/add`, updatedData, {
        headers: {
          "Authorization": `Bearer ${token}`, // Add auth token
          "Content-Type": "application/json",
        },
      });
      toast.success("Employee details updated successfully!", {
        position: "top-right",
        autoClose: 3000, // Auto close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      

      getEmployeeById();
    } catch (err) {
      console.error("Error updating employee details:", err);
      toast.error("Failed to update employee details.");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

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
       <ToastContainer /> {/* Add Toast Container for notifications */}
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
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </div>
          <div className="emp-form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="emp-form-group">
            <label>Age:</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} />
          </div>
          <div className="emp-form-group">
            <label>Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
          </div>
          <div className="emp-form-group">
            <label>Job Role:</label>
            <input type="text" name="jobRole" value={formData.jobRole} onChange={handleChange} />
          </div>
          <div className="emp-form-group">
            <label>Category:</label>
            <input type="text"  name ="category" value={formData.category} onChange={handleChange}/>
          </div>
          <div className="emp-form-group">
            <label>NIC:</label>
            <input type="text" value={employee.nic} readOnly />
          </div>
          <div className="emp-form-group">
            <label>Basic Salary:</label>
            <input type="number" name="basicSalary" value={formData.basicSalary} onChange={handleChange} />
          </div>
          <button type="emp-button" onClick={handleSave} className="emp-update-btn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
