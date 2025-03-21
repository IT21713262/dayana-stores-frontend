import React, { useState } from "react";
import "./OrderManagement.css";

// Add to Cart function to store items in localStorage
const addToCart = (product, quantity) => {
  const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
  const existingItemIndex = existingCart.findIndex((item) => item.id === product.id);

  if (existingItemIndex !== -1) {
    existingCart[existingItemIndex].quantity += quantity;
  } else {
    existingCart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
    });
  }

  localStorage.setItem('cartItems', JSON.stringify(existingCart));
  window.dispatchEvent(new Event('storage'));
};

// Category Dropdown Component
const CategoryDropdown = ({ onSelectCategory }) => {
  return (
    <div className="category-dropdown">
      <label>Categories</label>
      <select onChange={(e) => onSelectCategory(e.target.value)}>
        <option value="">--Select Category--</option>
        <option value="grains">Grains</option>
        <option value="snacks">Snacks</option>
        <option value="beverages">Beverages</option>
      </select>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product }) => {
  const [qty, setQty] = useState(1);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h4>{product.name}</h4>
      <p>Rs. {product.price} / {product.unit}</p>
      <div className="product-actions">
        <label>Quantity</label>
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value) || 1)}
        />
        <button
          className="add-to-cart-btn"
          onClick={() => addToCart(product, qty)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

// Sample Product Data
const products = [
  { id: 1, name: "Keeri Samba 1KG", price: 235, unit: "kg", image: "/Images/keerisamba.png", category: "grains" },
  { id: 2, name: "Mysore Dhal 1KG", price: 335, unit: "kg", image: "/Images/dhal.jpg", category: "grains" },
  { id: 3, name: "Chocolate Biscuit 400g", price: 520, unit: "unit", image: "/Images/chocoBiscuit.png", category: "snacks" },
  { id: 4, name: "Rich Life Fresh Milk 1L", price: 480, unit: "unit", image: "/Images/freshmilk.jpg", category: "beverages" },
  { id: 5, name: "Coca Cola 1050ml", price: 270, unit: "unit", image: "/Images/cocacola.jpg", category: "beverages" },
  { id: 6, name: "Wijaya Noodles 400g", price: 350, unit: "unit", image: "/Images/noodles.jpg", category: "snacks" }
];

const ProductList = () => {
  const [category, setCategory] = useState("");

  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  return (
    <div className="product-list">
      <div className="category-container">
        <CategoryDropdown onSelectCategory={setCategory} />
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;