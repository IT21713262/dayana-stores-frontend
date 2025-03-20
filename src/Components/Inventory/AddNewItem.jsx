import React from 'react'
import "./inventory-css/add-item.css"
import { IoMdArrowRoundBack } from "react-icons/io";
import { SiGoogleforms } from "react-icons/si";
import { CiImageOn } from "react-icons/ci";
import { Bounce, Slide, Zoom,ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import { useState,useEffect,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function AddNewItem() {

  const [formData, setFormData] = useState({
    item_name: "",
    category: "",
    current_qty: "",  
    max_qty: "",
    unit_price: "",
    purchase_date: "",
    expiration_date: "",
    reorder_level: "",
    location: "",
  });

  const fileInputRef = useRef(null); // Reference to file input
  const [imagePath, setImagePath] = useState(""); // Temporary image path from backend
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  //  Handle Image Selection
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8081/inventory/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setImagePath(response.data); // Store returned image path
        console.log("Image uploaded successfully:", response.data.imagePath);
      }
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    const toastId = toast.loading("Adding Item...");
    
    e.preventDefault();
    if (!imagePath) {
      alert("Please upload an image first.");
      return;
    }

    const itemData = {
      ...formData,
      item_image: imagePath,
    };

    try {
      const response = await axios.post(
        "http://localhost:8081/inventory/add-item",
        itemData,  // Send data properly
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        toast.update(toastId, {
                  render: "Added Item Successfully...",
                  type: "success",
                  isLoading: false,
                  autoClose: 5000, 
                  theme:'colored'
              });
        setImagePath("");
        resetForm();
      } else {
        alert("Failed to add item.");
      }
    } catch (error) {
      toast.update(toastId, {
              render: "Could not Add item",
              type: "error",
              isLoading: false,
              autoClose: 5000, 
              theme:'colored'
          });
      console.error("Error adding item", error);
    }
};


   // Handle Form Submission
   const debug = async (e) => {
    e.preventDefault();
    if (!imagePath) {
      alert("Please upload an image first.");
      return;
    }

    const itemData = {
      ...formData,
      item_image: imagePath,
    };

    console.log(itemData);
  };

 //Handle Form Reset (Deletes Uploaded Image)
 const resetForm = async () => {
 
  // Clear form fields and image path
  setFormData({
    item_name: "",
    category: "",
    current_qty: "",
    max_qty: "",
    unit_price: "",
    purchase_date: "",
    expiration_date: "",
    reorder_level: "",
    location: "",
  });  setImagePath("");

};

const removeImage= async () => {
  if (imagePath) {
    try {
      await axios.delete(`http://localhost:8081/inventory/delete-image`, {
        data: { imagePath }, // Send imagePath in request body
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input
      }
      console.log("deleted image");
    } catch (error) {
      console.error("Error deleting image", error);
    }
  }
  setImagePath("");

};



  return (
    <>
    <Link to='/InventoryDashboard' style={{textDecoration:'none'}}>
    <button style={{margin:"20px 20px",border:"none", padding:"10px 12px",backgroundColor:"#54B168",cursor:"pointer",borderRadius:"35px"}}>
    <IoMdArrowRoundBack style={{fontSize:"24px",color:"white"}}/></button></Link>

    
        <h2 className='other-page-title'>Add New Item <SiGoogleforms /></h2>
        <hr className='green-line'></hr>
      <div className='form-container'>
        <form className='add-form'>
            <div className='right-side'>

            {/* Image upload section */}
              <label className='input-label'>Add Item Image</label>
              <div className="image-upload-box" >
                {imagePath ? (
                  <img src={imagePath} alt="Uploaded Preview" className="preview-image" />
                ) : (
                  <div className="upload-placeholder">
                    <CiImageOn size={40} /><p>
                    Click to upload image</p>
                    <button type="button" className="choose-file-btn" onClick={() => fileInputRef.current.click()}>Choose File</button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                {imagePath && (
                  <button type="button" onClick={removeImage} className="remove-image-btn">
                    Remove
                  </button>
                )}
              </div>


            {/*form fields*/}
            <label className='input-label'>Item Name</label>
            <input className='add-form-input' type="text" name="item_name" placeholder="Item Name" value={formData.item_name} onChange={handleChange} required />
           
            <label className='input-label'>Category</label>
            <input className='add-form-input'type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
           
            <label className='input-label'>Current Quantity Of Item (Stock Available in Hand)
            <span className="tooltip">ℹ️
            <span className="tooltip-text">This is the amount of stock currently available.</span>
            </span>
            </label>
            <input className='add-form-input' type="number" name="current_qty" placeholder="e.g., 50 (Items in stock)" value={formData.current_qty} onChange={handleChange} required />
           
            <label className='input-label'>Maximum Quantity Of Item (Capacity Limit)
            <span className="tooltip">ℹ️
            <span className="tooltip-text">This is the maximum storage capacity the store can accomodate.</span>
            </span>
            </label>
            <input className='add-form-input'type="number" name="max_qty" placeholder="e.g., 100 (Total storage capacity)" value={formData.max_qty} onChange={handleChange} required />
            </div>

            <div className='left-side'>
            <label className='input-label'>Unit Price Of Item (LKR) </label>  
            <input className='add-form-input'type="number" name="unit_price" placeholder="Unit Price" value={formData.unit_price} onChange={handleChange} required />
            
            <label className='input-label'>Purchase Date Of Item</label>
            <input className='add-form-input'type="date" name="purchase_date" value={formData.purchase_date} onChange={handleChange} required />
           
            <label className='input-label'>Expiration Date Of Item
            <span className="tooltip">ℹ️
            <span className="tooltip-text">Set the expiration date to alert on near expiry products </span>
            </span>
            </label>
            <input className='add-form-input'type="date" name="expiration_date" value={formData.expiration_date} onChange={handleChange} required />
          
            <label className='input-label'>Enter Threshold Level For Alerting On Low Stock
            <span className="tooltip">ℹ️
            <span className="tooltip-text">This value will determine if the stock level has reached this value,
              <br></br>
              and if reached will send an automated purchase order via email.
            </span>
            </span>
            </label>
            <input className='add-form-input' type="number" name="reorder_level" placeholder="Reorder Level" value={formData.reorder_level} onChange={handleChange} required />
           
            <label className='input-label'>Enter Where To Locate Item In Store</label>
            <input className='add-form-input'type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
            </div>

        </form>

        {/* Buttons */}
        <div className="button-group">
             <button type="button" onClick={handleSubmit} className='add-item-btn'>Add Item</button>
             <button type="button" onClick={resetForm} className="cancel-btn">Cancel</button>
        </div>
        
      </div>
      <ToastContainer 
      position='bottom-right'
      autoClose={false}
      closeButton={false}
      transition={Bounce}
      />
    </>
  )
}

export default AddNewItem