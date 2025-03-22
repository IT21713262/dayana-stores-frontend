import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaBoxOpen } from "react-icons/fa";
import axios from 'axios'
import { useState,useEffect} from 'react'
import { AiOutlineStock } from "react-icons/ai";
import { FaMinus } from "react-icons/fa6";
import { FaBoxesPacking } from "react-icons/fa6";


function LowStockItemPage() {

  const [stockWorth, setStockWorth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token"); // Make sure your token is stored

  useEffect(() => {
    axios
      .get("http://localhost:8081/admin/inventory/stock-worth",
        {
          headers: {
            "Authorization": `Bearer ${token}` 
           },
        }
      )
      .then((response) => {
        setStockWorth(response.data); 
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
    <h2 className='other-page-title'>Overview of Stocks <AiOutlineStock /> </h2>
    <hr className='green-line'></hr>

      {/* Show Loading Message */}
      {loading && <p style={{ textAlign: "center", color: "#888" }}>Loading low stock items...</p>}

      {/* Show Error Message */}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      {/* Show Empty State if No Expired Items */}
      {!loading && stockWorth.length === 0 && !error && (
        <div style={{ textAlign: "center", marginTop: "120px" }}>
          <img src="/stocks.jpg" alt="No Expired Items" style={{width: "270px", marginBottom: "10px" }} />
          <p style={{ color: "#888" }}>You have no items to calculate stock worth.</p>
        </div>
      )}

    {/* table to show low stocks */}
    {!loading && stockWorth.length > 0 && (
    <div className='table-container'>
      <table className='item-table'>
      <thead>
          <tr>
            <th></th>
            <th>Category</th>
            <th>Stock value of this Category</th>
            <th>Total unique items in this Category</th>
            <th>Total qty of items belonging to this Category</th>
            <th>Average price of items in this Category</th>
          </tr>
        </thead>
        <tbody>
        {stockWorth.map((item) => (
      <tr key={item.item_id}>
        <td><FaBoxesPacking size={24}/>
        </td>
        <td>{item.category}</td>
        <td>Rs.{item.totalStockValue?.toFixed(2)}</td>
        <td>{item.totalItems}</td>
        <td>{item.totalQuantity}</td>
        <td>Rs.{item.averagePrice?.toFixed(2)}</td>

           
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