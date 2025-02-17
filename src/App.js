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
        <Route path="/" element={<SupplierDashboard />} /> {/* Default route */}

      </Routes>
    </Router>
  );
}

export default App;
