// src/App.js
import React from "react";
//import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SupplierDashboard from "./Components/Suppliers/SupplierDashboard";
import AddSupplier from "./Components/Suppliers/addSuppliers";
import SupplierTransactions from "./Components/Suppliers/SupplierTransactions"; 
import AddTransaction from "./Components/Suppliers/AddTransaction";
import GenerateReport from "./Components/Suppliers/GenerateReport";
import * as Inventory from "./Components/Inventory/InventoryRoutes";
import LoginPage from '../src/Components/Users/auth/LoginPage'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ProfilePage from '../src/Components/Users/userspage/ProfilePage';
import UserService from './Components/Users/service/UserService';
import RegistrationPage from '../src/Components/Users/auth/RegistrationPage';
import UserManagementPage from '../src/Components/Users/userspage/UserManagementPage';
import UpdateUser from '../src/Components/Users/userspage/UpdateUser';
import { AuthProvider } from './Components/Users/auth/AuthContext';
import EmployeeDashboard from "./Components/Employee/EmployeeDashboard";
import AddEmployee from "./Components/Employee/AddEmployee";
import ViewEmployee from "./Components/Employee/ViewEmployee";
import EditEmployee from "./Components/Employee/EditEmployee";
import ManageAttendance from "./Components/Employee/ManageAttendance";
import AttendanceSummary from "./Components/Employee/AttendanceSummary";

function App() {
  return (
    <BrowserRouter>
     <AuthProvider>
      
      <Routes>
        {/*user routes */}
        <Route exact path="/" element={<LoginPage />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} /> {/* Now accessible to all users */}
              <Route path="/profile" element={<ProfilePage />} />

              {/*Check if user is authenticated and admin, before rendering admin-only routes*/}
              {UserService.adminOnly() && (
                <>
                  
                  <Route path="/admin/user-management" element={<UserManagementPage />} />
                  <Route path="update-user/:userId" element={<UpdateUser />} />

                  {/*supplier routes*/}
                  <Route path="/supplierDashboard" element={<SupplierDashboard />} />
                  <Route path="/addSuppliers" element={<AddSupplier />} />
                  <Route path="/transactions" element={<SupplierTransactions />} />
                  <Route path="/addTransaction" element={<AddTransaction />} />
                  <Route path="/generateReport" element={<GenerateReport />} />

                  {/*inventory routes */}
                  <Route path="/InventoryDashboard" element={<Inventory.InventoryDashboard />} />
                  <Route path="/add-item" element={<Inventory.AddNewItem/>} />
                  <Route path="/expired-items" element={<Inventory.ExpiredItemPage/>} />
                  <Route path="/low-stock-items" element={<Inventory.LowStockItemPage/>} />
                  <Route path="/stock-worth" element={<Inventory.StockWorth/>} />

                  {/*Employee routes */}
                  <Route path="/EmployeeDashboard" element={< EmployeeDashboard />} />
                  <Route path="/AddEmployee" element={<AddEmployee />} />
                  <Route path="/ViewEmployee/:id" element={<ViewEmployee />} />
                  <Route path="/EditEmployee/:id" element={<EditEmployee />} />
                  <Route path="/ManageAttendance" element={<ManageAttendance />} />
                  <Route path="/AttendanceSummary" element={<AttendanceSummary />} />
                          </>
              )}
              <Route path='*' element={<Navigate to="/login" />} />%
      


        
        


      </Routes>
     
        </AuthProvider>
    </BrowserRouter>
  );
}

export default App;


