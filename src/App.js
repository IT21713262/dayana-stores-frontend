// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SupplierDashboard from "./Components/Suppliers/SupplierDashboard";
import AddSupplier from "./Components/Suppliers/addSuppliers";
import SupplierTransactions from "./Components/Suppliers/SupplierTransactions"; 
import AddTransaction from "./Components/Suppliers/AddTransaction";
import GenerateReport from "./Components/Suppliers/GenerateReport";
import * as Inventory from "./Components/Inventory/InventoryRoutes";
import EmployeeDashboard from "./Components/Employee/EmployeeDashboard";
import AddEmployee from "./Components/Employee/AddEmployee";
import ViewEmployee from "./Components/Employee/ViewEmployee";
import EditEmployee from "./Components/Employee/EditEmployee";

function App() {
  return (
    <Router>
      <Routes>
        {/*supplier routes*/}
        <Route path="/supplierDashboard" element={<SupplierDashboard />} />
        <Route path="/addSuppliers" element={<AddSupplier />} />
        <Route path="/transactions" element={<SupplierTransactions />} />
        <Route path="/addTransaction" element={<AddTransaction />} />
        <Route path="/generateReport" element={<GenerateReport />} />
        <Route path="/" element={<SupplierDashboard />} />

        {/*inventory routes */}
        <Route path="/InventoryDashboard" element={<Inventory.InventoryDashboard />} />

         {/*Employee routes */}
         <Route path="/EmployeeDashboard" element={< EmployeeDashboard />} />
         <Route path="/AddEmployee" element={<AddEmployee />} />
         <Route path="/ViewEmployee/:id" element={<ViewEmployee />} />
         <Route path="/EditEmployee/:id" element={<EditEmployee />} />

      </Routes>
    </Router>
  );
}

export default App;


