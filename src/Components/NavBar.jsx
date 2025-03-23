import React ,{useState}from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa6'
import * as AiIcons from 'react-icons/ai'
import {SidebarData} from './SidebarData'
import './nav-bar.css'
import { IconContext } from 'react-icons';
import { MdLogout } from "react-icons/md";




function NavBar() {

const [sidebar,setSidebar]=useState(false);

function logout() {
    localStorage.removeItem("role");
    localStorage.removeItem("itsp_provider_id");
    alert("Logged out successfully!");
  }

const showSidebar=()=> setSidebar(!sidebar);
 
  return (
    <>
    <div className='navbar'>
     <Link to='#' className='menu-bars'> <FaIcons.FaBars onClick={showSidebar}/></Link>
    </div>

    <nav className={sidebar ?'nav-menu active':'nav-menu'}>
        <ul className='nav-menu-items'  onClick={showSidebar}>
            <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                   <AiIcons.AiOutlineClose/>    
                </Link>
            </li>
            {SidebarData.map((item,index)=>{
                  const IconComponent = item.icon; // Use the reference
                return  (
                    <li key={index} className={item.className}>
                        <Link to={item.path}>
                            <IconComponent/>
                            <span>{item.title}</span>
                        </Link>
                    </li> 
                )
            })}
           
        </ul>
    </nav>  
   
    </>
  )
}

export default NavBar