// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import ManageAttendance from "./Components/Employee/ManageAttendance";
import AttendanceSummary from "./Components/Employee/AttendanceSummary";
import OrderManagementDashboard from "./Components/OrderManagement/OrderManagementDashboard";
import ProductList from "./Components/OrderManagement/ProductList";
import ViewCart from "./Components/OrderManagement/ViewCart";
import PlaceOrder from "./Components/OrderManagement/PlaceOrder";


import * as Inventory from "./Components/Inventory/InventoryRoutes";

function App() {
  return (
    <Router>
      <Routes>
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
        <Route path="/ManageAttendance" element={<ManageAttendance />} />
        <Route path="/AttendanceSummary" element={<AttendanceSummary />} />


        {/*Orders*/}
        <Route path="/OrderManagementDashboard" element={<OrderManagementDashboard />} />
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/viewCart" element={<ViewCart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        
        {/*Inventory*/}
        <Route path="/add-item" element={<Inventory.AddNewItem/>} />
        <Route path="/InventoryDashboard" element={<Inventory.InventoryDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
