// src/App.js
import React from "react";
import SupplierDashboard from "./Components/Suppliers/SupplierDashboard";
import AddSupplier from "./Components/Suppliers/addSuppliers";
import UpdateSupplier from "./Components/Suppliers/updateSuppliers";
import SupplierTransactions from "./Components/Suppliers/SupplierTransactions";
import AddTransaction from "./Components/Suppliers/AddTransaction";
import SupplierReport from "./Components/Suppliers/SupplierReport";
import ViewSupplier from "./Components/Suppliers/viewSupplier";
import EmployeeDashboard from "./Components/Employee/EmployeeDashboard";
import AddEmployee from "./Components/Employee/AddEmployee";
import ViewEmployee from "./Components/Employee/ViewEmployee";
import EditEmployee from "./Components/Employee/EditEmployee";
import OrderManagementDashboard from "./Components/OrderManagement/OrderManagementDashboard";

/*import GenerateReport from "./Components/Suppliers/GenerateReport";
import * as Inventory from "./Components/Inventory/InventoryRoutes"; */
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
        <Route path="/updateSuppliers/:id" element={<UpdateSupplier />} />
        <Route path="/transactions" element={<SupplierTransactions />} />
        <Route path="/addTransaction" element={<AddTransaction />} />

        <Route path="/supplierReport" element={<SupplierReport />} />
        <Route path="/viewSupplier/:id" element={<ViewSupplier />} />

         {/*Employee routes */}
        <Route path="/EmployeeDashboard" element={< EmployeeDashboard />} />
        <Route path="/AddEmployee" element={<AddEmployee />} />
        <Route path="/ViewEmployee/:id" element={<ViewEmployee />} />
        <Route path="/EditEmployee/:id" element={<EditEmployee />} />

        {/*Orders*/}
        <Route path="/OrderManagementDashboard" element={<OrderManagementDashboard />} />

        
        <Route path="/generateReport" element={<GenerateReport />} />
        <Route path="/" element={<SupplierDashboard />} />

        {/*inventory routes */}
        <Route path="/InventoryDashboard" element={<Inventory.InventoryDashboard />} />
        <Route path="/add-item" element={<Inventory.AddNewItem/>} />


      </Routes>
      </div>
          <Footer />
        </div>
        </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
