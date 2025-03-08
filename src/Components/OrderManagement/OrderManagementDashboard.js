import React, { useState } from "react";
import "./OrderManagement.css";
import OrderNavBar from "./OrderNavBar";
import ProductList from "./ProductList";

const OrderManagementDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={sidebarOpen ? "dashboard sidebar-open" : "dashboard"}>
      <OrderNavBar setSidebarOpen={setSidebarOpen} /> 
      <div className="content">
        <ProductList />
      </div>
    </div>
  );
};

export default OrderManagementDashboard;
