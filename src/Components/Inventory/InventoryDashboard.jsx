import React from 'react'
import NavBar from '../NavBar'
import "./inventory-css/inventory-dashboard.css"
import { Link } from 'react-router-dom'
import { useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { FaShoppingBasket } from "react-icons/fa"; 
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdInfo } from "react-icons/md";
import { Bounce, Slide, Zoom,ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { IoMdAdd } from "react-icons/io";
import axios from 'axios'

function InventoryDashboard() {

  const navigator=useNavigate();
  const [items, setItems] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [imagePath,setImagePath]=useState(null);

  useEffect(() => {
    // Fetch all items from the backend
    axios.get("http://localhost:8081/inventory/all-items")
        .then(response => {
          setItems(response.data); // Set the client data
        })
        .catch(error => {
            console.error("Error fetching clients:", error.response.data);
        });
}, []);

// Log items correctly after state update
useEffect(() => {
  console.log("Updated Items:", items);
}, [items]); 

  // Function to toggle menu visibility
  const toggleMenu = (itemId) => {
    setMenuOpen(menuOpen === itemId ? null : itemId);
  };

  // Function placeholders for actions
  const handleEdit = (id) => {
    console.log("Edit item:", id);
  };

  // Handle delete request
  const handleDeleteClick = (id,imagePath) => {
    setDeleteItemId(id);
    setImagePath(imagePath)
    setShowModal(true); // Show confirmation modal
  };

  // Handle confirmation of deletion
  const handleConfirmDelete = async () => {
    // Proceed with delete action
    setShowModal(false); // Close modal
    const toastId = toast.loading("Deleting Item...");
    try {
      const response=await axios.delete(`http://localhost:8081/inventory/delete-item/${deleteItemId}`,{
        data:{imagePath}
      });
      if(response.status===200)
      {
        toast.update(toastId, {
          render: "Deleted Item Successfully...",
          type: "success",
          isLoading: false,
          autoClose: 5000, 
          theme:'colored'
      });
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Deletion failed",
        type: "error",
        isLoading: false,
        autoClose: 5000, 
        theme:'colored'
    });
      console.error("Error deleting image", error);
    }

  };

  // Handle modal cancellation
  const handleCancelDelete = () => {
    setShowModal(false); // Close modal
  };

 const handleViewMore = (id) => {
    console.log("View more details of:", id);
  };

 // Function to calculate progress bar width
 const getProgressWidth = (currentQty, maxQty) => {
  return maxQty > 0 ? `${(currentQty / maxQty) * 100}%` : "0%";
};

  const getStatusColor = (status) => {
    switch (status) {
        case "Available":
            return "#4CAF50"; // Green
        case "Moderate":
            return "#FFC107"; // Yellow
        case "Low":
            return "#F44336"; // Red
        case "Out of Stock":
            return "#F44336";    
        default:
            return "#607D8B"; // Gray (for unknown statuses)
    }
  };

  const goToAddItem=()=>
  {
    navigator('/add-item');
  }


  return (

    <>
    <NavBar/>
    <div className="card-container">
      <div className="card">
        <div className="icon-container">
          <FaShoppingBasket className="icon" />
        </div>
        <div className='text-container'>
        <p className="title">Total Expired Items</p>
        <h2 className="amount">4</h2>
        </div>
      </div>
      
      <div className="card">
        <div className="icon-container">
          <FaShoppingBasket className="icon" />
        </div>
        <div className='text-container'>
        <p className="title">Total Items with Low stock</p>
        <h2 className="amount">7</h2>
        </div>
      </div>
      
      <div className="card">
        <div className="icon-container">
          <FaShoppingBasket className="icon" />
        </div>
        <div className='text-container'>
        <p className="title">Total Stock Net Worth</p>
        <h2 className="amount">Rs.574.34</h2>
        </div>
      </div>
    </div>

    {/*add new item button*/}
   <button type='button' onClick={goToAddItem} className='add-new-item-button'><IoMdAdd className='add-icon'/> 
    Add New Item</button>

    {/*table to display all items*/}
    <div className='table-container'>
      <table className='item-table'>
      <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {items.map((item) => (
            <tr key={item.item_id}>
              {/* Image Column */}
              <td>
                <img
                  src={item.item_image}
                  style={{ width: "50px", height: "50px", borderRadius: "4px"}}
                />
              </td>

              {/* Product Name */}
              <td>{item.item_name}</td>

              {/* Category */}
              <td>{item.category}</td>

              {/* Qty with Progress Bar */}
              <td style={{ width: "200px" }}>
              <div className='qty-container'>
              <span>{item.current_qty}</span>
                <div className='progress-container'>
                  <div className='progress-bar'style={{ width: getProgressWidth(item.current_qty, item.max_qty),backgroundColor: getStatusColor(item.status) }}>
                  </div>
                </div>
                <span className="status-badge" style={{ backgroundColor: getStatusColor(item.status) }}>
                {item.status}
                </span> 
              </div>    
              </td>

              {/* Unit price */}
              <td>Rs.{item.unit_price?.toFixed(2)}</td>

              {/* Meatball Menu Column */}
              <td style={{position:"relative"}}>
              <button className="meatball-menu" onClick={() => toggleMenu(item.item_id)}>
               <BiDotsVerticalRounded className='menu-icon' />
              </button>
              {menuOpen === item.item_id && (
                  <div className="menu-dropdown">
                    <button onClick={() => console.log("Edit:", item.item_id)}><MdEdit size={18} style={{ marginRight: "8px", color: "#4CAF50" }} />
                    Edit</button>
                    <button onClick={() => handleDeleteClick(item.item_id,item.item_image)}><MdDelete size={18} style={{ marginRight: "8px", color: "#F44336" }} />
                    Delete</button>
                    <button onClick={() => console.log("View More:", item.item_id)}><MdInfo size={18} style={{ marginRight: "8px", color: "#2196F3" }} /> 
                    View More</button>
                  </div>
                )}
              </td>
            </tr>

          ))}

        </tbody>

      </table>
    </div>
    <ToastContainer 
      position='top-right'
      autoClose={false}
      closeButton={false}
      transition={Bounce}
      />
      {/* delete Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Are you sure you want to delete this item?</h3>
            <div className="modal-buttons">
              <button onClick={handleConfirmDelete} className="confirm-button">Confirm</button>
              <button onClick={handleCancelDelete} className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}


    </>
  )
}

export default InventoryDashboard