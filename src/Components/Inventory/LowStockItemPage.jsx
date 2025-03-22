import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaBoxOpen } from "react-icons/fa";
import axios from 'axios'
import { useState,useEffect} from 'react'
import { IoMdAdd } from "react-icons/io";


function LowStockItemPage() {

  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token"); // Make sure your token is stored

  useEffect(() => {
    axios
      .get("http://localhost:8081/admin/inventory/low-stock",
        {
          headers: {
            "Authorization": `Bearer ${token}` 
           },
        }
      )
      .then((response) => {
        setLowStockItems(response.data); 
        setLoading(false); // Data fetched successfully

      })
      .catch((error) => {
        console.error("Error fetching low stocks:", error);
        setError("Failed to fetch low stock items. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <>
     <Link to='/InventoryDashboard' style={{textDecoration:'none'}}>
    <button style={{margin:"20px 20px",border:"none", padding:"10px 12px",backgroundColor:"#54B168",cursor:"pointer",borderRadius:"35px"}}>
    <IoMdArrowRoundBack style={{fontSize:"24px",color:"white"}}/></button></Link>
    <h2 className='other-page-title'>Low Stock Items <FaBoxOpen /></h2>
    <hr className='green-line'></hr>

    
    {/* Show Loading Message */}
    {loading && <p style={{ textAlign: "center", color: "#888" }}>Loading low stock items...</p>}

    {/* Show Error Message */}
    {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

    {/* Show Empty State if No Expired Items */}
    {!loading && lowStockItems.length === 0 && !error && (
      <div style={{ textAlign: "center", marginTop: "120px" }}>
        <img src="/no-items-pic.jpg" alt="No Expired Items" style={{width: "270px", marginBottom: "10px" }} />
        <p style={{ color: "#888" }}>You have No low stock items, all good here.</p>
      </div>
    )}

    {/* table to show low stocks */}
    {!loading && lowStockItems.length > 0 && (
    <div className='table-container'>
      <table className='item-table'>
      <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Remaining Qty</th>
            <th>Reorder Threshold Level</th>
            <th>Suggested Restock Amount</th>
          </tr>
        </thead>
        <tbody>
        {lowStockItems.map((item) => (
      <tr key={item.item_id}>
        <td>
          <img src={item.item_image} style={{ width: "50px", height: "50px", borderRadius: "4px" }} />
        </td>
        <td>{item.item_name}</td>
        <td>{item.category}</td>
        <td>{item.current_qty}</td>
        <td>{item.reorder_level}</td>
        <td><IoMdAdd color='green' size={19}/>
        {item.suggested_restock_amount}</td>      
      </tr>
    ))}
        </tbody>
      </table>
    </div>
    )}
    </>
  )
}

export default LowStockItemPage