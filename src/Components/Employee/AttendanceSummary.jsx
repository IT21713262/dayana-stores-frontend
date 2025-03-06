import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa"; // Importing the search icon
import NavBar from "../NavBar";
import "./AttendanceSummary.css"; // Ensure this file exists

const BASE_URL = "http://localhost:8081/employee";
const BASE_URL1 = "http://localhost:8081/attendance";

const AttendanceSummary = () => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query

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
        initialAttendance[emp.id] = { status: null, leaveStatus: null };
      });
      setAttendance(initialAttendance);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };


  // Filtering employees based on search query
  const filteredEmployees = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <div className="header-bar">
        <NavBar />
        <h2 className="dashboard-title"> Attendance Summary</h2>
        <div className="header-buttons">
          <button className="header-button">Manage Employee</button>
          <button className="header-button">Manage Attendance</button>
        </div>
      </div>
      <div className="attendance-header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Employee"
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Handle search query change
          />
          <FaSearch className="search-icon" />
        </div>

        <div className="calendar-container">
          <input type="date" className="calendar" /> {/* Calendar input */}
        </div>
      </div>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Job Role</th>
            <th>Phone No</th>
            <th>Attendance Count</th>
            <th>Leave Count</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{`${emp.firstName} ${emp.lastName}`}</td>
              <td>{emp.jobRole}</td>
              <td>{emp.phoneNumber}</td>
              <td>{emp.attendanceCount}</td> {/* Display attendance count */}
              <td>{emp.leaveCount}</td> {/* Display leave count */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceSummary;
