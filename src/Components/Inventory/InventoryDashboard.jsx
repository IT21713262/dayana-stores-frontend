import React, { use } from 'react'
import NavBar from '../NavBar'
import "./inventory-css/inventory-dashboard.css"
import { Link } from 'react-router-dom'
import { useState,useEffect,useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { FaShoppingBasket } from "react-icons/fa"; 
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdInfo } from "react-icons/md";
import { GiEmptyHourglass } from "react-icons/gi";
import { FaBoxOpen } from "react-icons/fa";
import { FaCalendarTimes } from "react-icons/fa";
import { MdMonetizationOn } from "react-icons/md";
import { FcInfo } from "react-icons/fc";
import { IoSearchSharp } from "react-icons/io5";

import ClipLoader from "react-spinners/ClipLoader";


import { Bounce, Slide, Zoom,ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { IoMdAdd } from "react-icons/io";
import axios from 'axios'
import Footer from '../Users/common/Footer'

function InventoryDashboard() {

  const navigator=useNavigate();
  const fileInputRef = useRef(null); // Reference to file input
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [imagePath,setImagePath]=useState(null);  // used in delete function
  const [selectedItem, setSelectedItem] = useState(null);
  const[viewMoreItem,setViewMoreItem]=useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [editedImage, setEditedImage] = useState(null);  // store a temporary edited image url to show preview
  const [savedImage, setSavedImage] = useState(null);  // capture the current image url
  const [imageFile, setImageFile] = useState(null);     //store the new image file

  const[oldCurrentQty,setOldCurrentQty]=useState(0);
  const[oldMaximumQty,setOldMaximumQty]=useState(0);
  const[newMaxQty,setNewMaxQty]=useState(0);
  const[newCurrentQty,setNewCurrentQty]=useState(0);

  const [stats, setStats] = useState({
    totalExpiredItems: 0,
    totalLowStockItems: 0,
    totalStockNetWorth: 0.0,
  });

  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = searchQuery.trim() === ""
  ? items  // Show all items when search is empty
  : items.filter((item) =>
      item.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const token = localStorage.getItem("token"); // Make sure your token is stored

  useEffect(() => {

    // Fetch all items from the backend
    axios.get("http://localhost:8081/admin/inventory/all-items",
      {
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
      }
    )
        .then(response => {
          setItems(response.data); 
          console.log("eeee")// Set the client data
          setLoading(false);
        })
        .catch(error => {
          
          if(error.code === 'ERR_NETWORK'){
            setLoading(true);
          toast.warn('Backend Server is not Running 😖, Unable to fetch data', {
            position: "top-right",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
            console.error("Connection Issue", error);
          }
        });
}, []);

useEffect(() => {
  axios
    .get("http://localhost:8081/admin/inventory/statistics",
      {
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
      }
    )
    .then((response) => {
      setStats(response.data); 
    })
    .catch((error) => {
      console.error("Error fetching statistics:", error);
    });
}, []);

// Log items correctly after state update
// useEffect(() => {
//   console.log("Updated Items:", items);
// }, [items]); 

  // Function to toggle menu visibility
  const toggleMenu = (itemId) => {
    setMenuOpen(menuOpen === itemId ? null : itemId);
  };

  const handleEdit = (item,imagePath,oldCurrentQty,oldMaximumQty) => {
    setSelectedItem(item);
    setSavedImage(imagePath);
    setOldCurrentQty(oldCurrentQty);
    setOldMaximumQty(oldMaximumQty);
    setSidebarOpen(true);
    setMenuOpen(null); // Close the menu

  };
  const handleImageChange = (event) => {   // will make a url for temporarily showing the image
    const file = event.target.files[0];
    if (file) {
      setEditedImage(URL.createObjectURL(file));
      console.log(savedImage)
      setImageFile(file);
    }
  };
  useEffect(() => {
    console.log("Updated editedImage:", editedImage);
  }, [editedImage]); // This runs whenever editedImage changes
  
  const quantityValidation=() =>
  {
    let validationStatus=true;
    if(newCurrentQty>oldMaximumQty || newCurrentQty>newMaxQty )
    {
      validationStatus=false;
      alert("current qty exceeds maximun qty, would you like to increase maximum qty/capacity and retry");
    }
    if(validationStatus)
    {
      handleSave();
    }
  }
  const handleSave =async (e)=>{

    let newImagePath = savedImage; // Default to current image

    //first delete old image 
    if(editedImage){
    if (savedImage) {
      try {
        let imagePath=savedImage;
        await axios.delete(`http://localhost:8081/admin/inventory/delete-image`, {
          data: { imagePath }, // Send imagePath in request body
        },
      {
        headers: { 
          "Authorization": `Bearer ${token}` 
        },
      });
        console.log("deleted image");
      } catch (error) {
        console.error("Error deleting image", error);
      }
    }
    setSavedImage(null);

    // second add new edited image and get url
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await axios.post("http://localhost:8081/admin/inventory/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}` 
        },
      });

      if (response.status === 200) {
        newImagePath = response.data; // Store new image URL
        console.log("Image uploaded successfully:", response.data.imagePath);
      }
    } catch (error) {
      console.error("Image upload failed", error);
    }
  }
   // Now update itemData with edited details and the correct image path
   const itemData = {
    ...selectedItem,
    item_image: newImagePath, // Use the existing or new image path
  };
  console.log(itemData);

    // third add all edited stuff 
    try {
      const response = await axios.put(
        "http://localhost:8081/admin/inventory/edit-item",
        itemData,  // Send data properly
        {
          headers: 
          { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
           },
        }
      );

      if (response.status === 200) {
        console.log("edited item")
        alert("succesfully edited item");
        console.log(response);
      } else {
        alert("Failed to edit item.");
      }
    } catch (error) {
      
      console.error("Error adding item", error);
    }
    
  }

  const handleChange = (e) => {
    setSelectedItem({ ...selectedItem, [e.target.name]: e.target.value });
  };


  // Handle delete request
  const handleDeleteClick = (id,imagePath) => {
    setDeleteItemId(id);
    setImagePath(imagePath)
    setShowModal(true); // Show confirmation modal
    setMenuOpen(null); // Close the menu

  };

  // Handle confirmation of deletion
  const handleConfirmDelete = async () => {
    // Proceed with delete action
    setShowModal(false); // Close modal
    const toastId = toast.loading("Deleting Item...");
    try {
      const response=await axios.delete(`http://localhost:8081/admin/inventory/delete-item/${deleteItemId}`,{
        data:{imagePath}
      },
    {
      headers: 
      { 
        "Authorization": `Bearer ${token}` 
       },
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
  const handleCancel = () => {
    if(showModal){
      setShowModal(false); // Close modal
    }
    if(showViewModal){
      setShowViewModal(false);
    }
  };

 const handleViewMoreClick = (item) => {
    setShowViewModal(true); // Show confirmation modal
    setMenuOpen(null); // Close the menu
    setViewMoreItem(item);
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
          <FaCalendarTimes className="icon" />
        </div>
        <div className='text-container'>
        <p className="title">Total Expired Items</p>
        <h2 className="amount">{stats.totalExpiredItems}</h2>
        <Link to='/expired-items' style={{textDecoration:'none',color:"grey"}}>Click to view</Link>
        </div>
      </div>
      
      <div className="card">
        <div className="icon-container">
          <FaBoxOpen className="icon" />
        </div>
        <div className='text-container'>
        <p className="title">Total Items with Low stock</p>
        <h2 className="amount">{stats.totalLowStockItems}</h2>
        <Link to='/low-stock-items' style={{textDecoration:'none',color:"grey"}}>Click to view </Link>

        </div>
      </div>
      
      <div className="card">
        <div className="icon-container">
          <MdMonetizationOn className="icon" />
        </div>
        <div className='text-container'>
        <p className="title">Total Stock Net Worth</p>
        <h2 className="amount">Rs.{stats.totalStockNetWorth}</h2>
        <Link to='/stock-worth' style={{textDecoration:'none',color:"grey"}}>Click to view</Link>
        </div>
      </div>
    </div>

    {/*add new item button*/}
    <div className='top-bar'>
      <button type='button' onClick={goToAddItem} className='add-new-item-button' ><IoMdAdd className='add-icon'/> 
        Add New Item</button>
        
        <div className="search-container">
        <input
          type="text"
          placeholder="🔍Search an Item by Name or Category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
          
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery("")} className="clear-btn">
            ✖
          </button>
        )}
      </div>
    </div>
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
  {loading ? ( 
    <tr>
      <td colSpan="6">
        <ClipLoader color="red" loading={loading} size={15} aria-label="Loading Spinner" data-testid="loader" />  
        Trying to fetch items...
      </td>
    </tr>
  ) : items.length === 0 ? ( // Show empty state when inventory has no items
    <tr>
      <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
        <img src="/no-stat-items.jpg" alt="Empty Inventory" style={{ width: "180px", marginBottom: "10px" }} />
        <p style={{ color: "#888" }}>Your inventory is empty. Add items to begin.</p>
      </td>
    </tr>
  ) : filteredItems.length > 0 ? (
    filteredItems.map((item) => (
      <tr key={item.item_id}>
        <td>
          <img src={item.item_image} style={{ width: "50px", height: "50px", borderRadius: "4px" }} />
        </td>
        <td>{item.item_name}</td>
        <td>{item.category}</td>
        <td style={{ width: "200px" }}>
          <div className="qty-container">
            <span>{item.current_qty}</span>
            <div className="progress-container">
              <div className="progress-bar" 
                   style={{ width: getProgressWidth(item.current_qty, item.max_qty), backgroundColor: getStatusColor(item.status) }}>
              </div>
            </div>
            <span className="status-badge" style={{ backgroundColor: getStatusColor(item.status) }}>
              {item.status}
            </span> 
          </div>    
        </td>
        <td>Rs.{item.unit_price?.toFixed(2)}</td>
        <td style={{ position: "relative" }}>
          <button className="meatball-menu" onClick={() => toggleMenu(item.item_id)}>
            <BiDotsVerticalRounded className="menu-icon" />
          </button>
          {menuOpen === item.item_id && (
            <div className="menu-dropdown">
              <button onClick={() => handleEdit(item, item.item_image, item.current_qty, item.max_qty)}>
                <MdEdit size={18} style={{ marginRight: "8px", color: "#4CAF50" }} /> Edit
              </button>
              <button onClick={() => handleDeleteClick(item.item_id, item.item_image)}>
                <MdDelete size={18} style={{ marginRight: "8px", color: "#F44336" }} /> Delete
              </button>
              <button onClick={() => handleViewMoreClick(item)}>
                <MdInfo size={18} style={{ marginRight: "8px", color: "#2196F3" }} /> View More
              </button>
            </div>
          )}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6">No items found.</td>
    </tr>
  )}
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
              <button onClick={handleCancel} className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}

       {/* edit Sidebar */}
       <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <p className='edit-heading'>Edit Item</p>
          <hr></hr>
          <div className="button-group-edit">
            <button onClick={quantityValidation}>Save</button>
            <button onClick={() => setSidebarOpen(false)} className="cancel">Cancel</button>
          </div>

          <label>Product Image</label>
          <div className='image-upload-box'>
          <img src={editedImage || savedImage} alt="Uploaded Preview" className="edit-preview-image" />
          <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />

          </div>
          <button className='change-image-btn' onClick={() => fileInputRef.current.click()}>Change Image</button>    

          
          <label>Name</label>
          <input type="text" name="item_name" value={selectedItem?.item_name || ""} onChange={handleChange} />

          <label>Category</label>
          <input type="text" name="category" value={selectedItem?.category || ""} onChange={handleChange} />

          <label>Current Quantity</label>
          <input type="number" name="current_qty" value={selectedItem?.current_qty || ""} min={oldCurrentQty} onChange={(e) => {handleChange(e); setNewCurrentQty(e.target.value);}} />

          <label>Maximum Quantity</label>
          <input type="number" name="max_qty" value={selectedItem?.max_qty || ""} min={oldMaximumQty} onChange={(e) => {handleChange(e);  setNewMaxQty(e.target.value);}} />

          <label>Unit Price of Item (LKR) </label>
          <input type="number" name="unit_price" value={selectedItem?.unit_price || ""} onChange={handleChange} />

          <label>Purchase Date Of Item</label>
          <input type="date" name="purchase_date" value={selectedItem?.purchase_date} onChange={handleChange} required />

          <label>Expiration Date Of Item</label>
          <input type="date" name="expiration_date" value={selectedItem?.expiration_date} onChange={handleChange} required />
           
          <label>Threshold Level For Alerting On Low Stock</label>
          <input type="number" name="reorder_level" value={selectedItem?.reorder_level || ""} onChange={handleChange} />

          <label>Location of Item In Store</label>
          <input type="text" name="location" value={selectedItem?.location || ""} onChange={handleChange} />   
        </div>
      </div>

        {/* View More Modal */}
        {showViewModal && (
  <div className="view-modal-overlay">
    <div className="view-modal">
      <h3 className='view-modal-h3'> <FcInfo/> Item Details</h3>
      <img src={viewMoreItem?.item_image} alt="Product" className="product-image" />

      <div className="details-container">
        <div className="detail-row">
          <span className="detail-label">Name:</span>
          <span className="detail-value">{viewMoreItem?.item_name}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Category:</span>
          <span className="detail-value">{viewMoreItem?.category}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Current Quantity:</span>
          <span className="detail-value">{viewMoreItem?.current_qty}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Maximum Quantity:</span>
          <span className="detail-value">{viewMoreItem?.max_qty}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Unit Price (LKR):</span>
          <span className="detail-value">{viewMoreItem?.unit_price}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Purchase Date:</span>
          <span className="detail-value">{viewMoreItem?.purchase_date}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Expiration Date:</span>
          <span className="detail-value">{viewMoreItem?.expiration_date}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Threshold Level:</span>
          <span className="detail-value">{viewMoreItem?.reorder_level}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Location:</span>
          <span className="detail-value">{viewMoreItem?.location}</span>
        </div>
      </div>

      <div className="view-modal-buttons">
        <button onClick={handleCancel} className="cancel-button">Close</button>
      </div>
    </div>
  </div>
)}
<div style={{marginTop:"600px"}}>
<Footer/>
</div>
    </>
  )
}

export default InventoryDashboard