import { AiFillProduct } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";

export const Sidebar = [
  {
    title: 'View Products',
    path: '/OrderManagementDashboard',
    icon: AiFillProduct,
  },
  {
    title: 'View Cart',
    path: '/viewCart', 
    icon: FaShoppingCart,
  },
];
