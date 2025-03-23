import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './Components/Users/auth/AuthContext';
import LoginPage from './Components/Users/auth/LoginPage';
import RegistrationPage from './Components/Users/auth/RegistrationPage';
import ProfilePage from './Components/Users/userspage/ProfilePage';
import UserManagementPage from './Components/Users/userspage/UserManagementPage';
import UpdateUser from './Components/Users/userspage/UpdateUser';
import SupplierDashboard from './Components/Suppliers/SupplierDashboard';
import AddSupplier from './Components/Suppliers/addSuppliers';
import SupplierTransactions from './Components/Suppliers/SupplierTransactions';
import AddTransaction from './Components/Suppliers/AddTransaction';
import GenerateReport from './Components/Suppliers/GenerateReport';
import * as Inventory from "./Components/Inventory/InventoryRoutes";
import EmployeeDashboard from "./Components/Employee/EmployeeDashboard";
import AddEmployee from "./Components/Employee/AddEmployee";
import ViewEmployee from "./Components/Employee/ViewEmployee";
import EditEmployee from "./Components/Employee/EditEmployee";
import ManageAttendance from "./Components/Employee/ManageAttendance";
import AttendanceSummary from "./Components/Employee/AttendanceSummary";
import OrderManagementDashboard from "./Components/OrderManagement/OrderManagementDashboard";
import ProductList from "./Components/OrderManagement/ProductList";
import ViewCart from "./Components/OrderManagement/ViewCart";
import PlaceOrder from "./Components/OrderManagement/PlaceOrder";

function AppRoutes() {
  const { isAuthenticated, isAdmin, isUser } = useContext(AuthContext);

  return (
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route exact path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/profile" element={<ProfilePage />} />

      {/* Admin Routes */}
      {isAuthenticated && isAdmin && (
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
          <Route path="/add-item" element={<Inventory.AddNewItem />} />
          <Route path="/expired-items" element={<Inventory.ExpiredItemPage />} />
          <Route path="/low-stock-items" element={<Inventory.LowStockItemPage />} />
          <Route path="/stock-worth" element={<Inventory.StockWorth />} />

          {/*Employee routes */}
          <Route path="/EmployeeDashboard" element={< EmployeeDashboard />} />
          <Route path="/AddEmployee" element={<AddEmployee />} />
          <Route path="/ViewEmployee/:id" element={<ViewEmployee />} />
          <Route path="/EditEmployee/:id" element={<EditEmployee />} />
          <Route path="/ManageAttendance" element={<ManageAttendance />} />
          <Route path="/AttendanceSummary" element={<AttendanceSummary />} />
        </>
      )}

      {/* User Routes */}
      {isAuthenticated && isUser && (
        <>
          <Route path="/OrderManagementDashboard" element={<OrderManagementDashboard />} />
          <Route path="/ProductList" element={<ProductList />} />
          <Route path="/viewCart" element={<ViewCart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
        </>
      )}

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
