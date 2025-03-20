import { MdInventory } from "react-icons/md"
import { MdLogout } from "react-icons/md";
import { BsBoxes } from "react-icons/bs";




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
        title:'Profile',
        path:'/profile',
        icon:MdInventory,
        className:'nav-text'
    },
   

];