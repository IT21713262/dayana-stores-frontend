import { AiFillProduct } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";

export const Sidebar = [
  {
    title: 'View Products',
    path: '/supplierDashboard',
    icon: AiFillProduct,
  },
  {
    title: 'View Cart',
    path: '/InventoryDashboard',
    icon: FaShoppingCart,
  },
];
