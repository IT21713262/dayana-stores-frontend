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
import Navbar from './Components/Users/common/Navbar';
import Footer from './Components/Users/common/Footer';
import ProfilePage from '../src/Components/Users/userspage/ProfilePage';
import UserService from './Components/Users/service/UserService';
import RegistrationPage from '../src/Components/Users/auth/RegistrationPage';
import UserManagementPage from '../src/Components/Users/userspage/UserManagementPage';
import UpdateUser from '../src/Components/Users/userspage/UpdateUser';
import { AuthProvider } from './Components/Users/auth/AuthContext';
function App() {
  return (
    <BrowserRouter>
     <AuthProvider>
        <div className="App">
          <Navbar />
          <div className="content">
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
                </>
              )}
              <Route path='*' element={<Navigate to="/login" />} />%
        {/*supplier routes*/}
        <Route path="/supplierDashboard" element={<SupplierDashboard />} />
        <Route path="/addSuppliers" element={<AddSupplier />} />
        <Route path="/transactions" element={<SupplierTransactions />} />
        <Route path="/addTransaction" element={<AddTransaction />} />
        <Route path="/generateReport" element={<GenerateReport />} />
        <Route path="/" element={<SupplierDashboard />} />

        {/*inventory routes */}
        <Route path="/InventoryDashboard" element={<Inventory.InventoryDashboard />} />

        
      </Routes>
      </div>
          <Footer />
        </div>
        </AuthProvider>
    </BrowserRouter>
  );
}

export default App;


