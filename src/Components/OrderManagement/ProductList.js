import React, { useState, useEffect } from "react";
import "./OrderManagement.css";

const addToCart = async (product, quantity) => {
  const token = localStorage.getItem("token");

  try {
    await fetch(
      `http://localhost:8081/user/cart/add?productId=${product.id}&quantity=${quantity}`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItemIndex = existingCart.findIndex(
      (item) => item.id === product.id
    );

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

    localStorage.setItem("cartItems", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("storage"));
    alert("Product added to cart!");
  } catch (error) {
    console.error("Error adding product to cart:", error);
    alert("Failed to add product to cart.");
  }
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
      <p>Rs. {product.price}</p>
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

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/admin/inventory/all-items",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const mappedProducts = data.map((item) => ({
          id: item.item_id,
          name: item.item_name,
          price: item.unit_price,
          image: item.item_image,
          category: item.category ? item.category.toLowerCase() : "others",
        }));
        setProducts(mappedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [token]);

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
