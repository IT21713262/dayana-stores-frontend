// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SupplierDashboard from "./Components/Suppliers/SupplierDashboard";
import AddSupplier from "./Components/Suppliers/addSuppliers";
import SupplierTransactions from "./Components/Suppliers/SupplierTransactions"; 
import AddTransaction from "./Components/Suppliers/AddTransaction";
import GenerateReport from "./Components/Suppliers/GenerateReport";
import * as Inventory from "./Components/Inventory/InventoryRoutes";
import OrderManagementDashboard from "./Components/OrderManagement/OrderManagementDashboard";

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

        {/*Orders*/}
       <Route path="/OrderManagementDashboard" element={<OrderManagementDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;


