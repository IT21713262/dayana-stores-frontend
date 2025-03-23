import { MdInventory } from "react-icons/md"
import { MdLogout } from "react-icons/md";
import { BsBoxes } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";




export const SidebarData=[
    {
        title:'Suppliers',
        path:'/supplierDashboard',
        icon: BsBoxes,
        className:'nav-text'
    },
    {
        title:'Inventory',
        path:'/InventoryDashboard',
        icon:MdInventory,
        className:'nav-text'
    },
    {
        title:'Employee',
        path:'/EmployeeDashboard',
        icon:BsFillPeopleFill,        
        className:'nav-text'
    },
    {
        title:'Profile',
        path:'/profile',
        icon:CgProfile ,
        className:'nav-text'
    },
   

];