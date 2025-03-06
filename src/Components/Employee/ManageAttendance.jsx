import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";
import NavBar from "../NavBar";
import "./ManageAttendance.css"; // Ensure this file exists
import { useNavigate } from 'react-router-dom'; // Import useNavigate

  const BASE_URL = "http://localhost:8081/employee";
  const BASE_URL1 = "http://localhost:8081/attendance";
  
  
  const ManageAttendance = () => {
    const [employees, setEmployees] = useState([]);
    const [attendance, setAttendance] = useState({}); // Store attendance status
    const navigate = useNavigate();  // Initialize navigate function using useNavigate hook
  
    useEffect(() => {
      fetchEmployees();
    }, []);
  
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/list`);
        setEmployees(response.data);
  
        // Initialize attendance state with default values (null = not marked)
        const initialAttendance = {};
        response.data.forEach((emp) => {
          initialAttendance[emp.id] = null;
        });
        setAttendance(initialAttendance);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
  
    const handleMarkAttendance = async (id, isPresent) => {
      try {
        console.log(`Marking attendance for Employee ID: ${id}, Present: ${isPresent}`);
    
        // Determine the status based on the value of isPresent
        const status = isPresent ? "Present" : "Absent";
        const date = new Date().toISOString().split('T')[0]; // Get current date in "yyyy-MM-dd" format
    
        const response = await axios.post(`${BASE_URL1}/mark`, {
          employeeId: { id },  // Passing employeeId inside employee object
          date,              // Current date
          status,            // Present or Absent
        });
    
        if (response.status === 200) {
          setAttendance((prev) => ({
            ...prev,
            [id]: isPresent, // Update state properly
          }));
        } else {
          console.error("Unexpected response:", response);
        }
      } catch (error) {
        console.error("Error marking attendance:", error.response || error);
        alert("An error occurred while marking attendance.");
      }
    };

    
    
    const handleManageEmployeeClick = () => {
      navigate('/EmployeeDashboard'); // Navigate to Manage Employee page
    };
    
  
    return (
      <div className="dashboard-container">
        <div className="header-bar">
          <NavBar />
          <h2 className="dashboard-title">Manage Attendance</h2>
          <div className="header-buttons">
          <button className="header-button" onClick={handleManageEmployeeClick}>
            Manage Employee
          </button>
          
        </div>
        </div>  
        <button className="summary-header-button">Attendance Summary</button>
        <table className="employee-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Phone No</th>
              <th>Mark Attendance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{`${emp.firstName} ${emp.lastName}`}</td>
                <td>{emp.phoneNumber}</td>
                <td className="attendance-buttons">
                <FaCheck
                    className={`present-button ${attendance[emp.id] === true ? "selected" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation(); // Ensure event doesn't bubble
                      handleMarkAttendance(emp.id, true);
                      window.location.reload(); // This will reload the current page
                    }}
                    style={{ pointerEvents: "auto" }} // Ensure clicks are allowed
                  />

                  <FaTimes
                    className={`absent-button ${attendance[emp.id] === false ? "selected" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAttendance(emp.id, false);
                      window.location.reload(); // This will reload the current page
                    }}
                    style={{ pointerEvents: "auto" }} 
                  />

                </td>
                <td>{emp.attendanceStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
export default ManageAttendance;
  