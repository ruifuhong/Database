import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../stylesheets/show_product.css";
const baseUrl = process.env.REACT_APP_BASE_URL;

const ProductShow = () => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { productId } = useParams();
  const currentPath = window.location.pathname;

  const extractProductId = () => {
    const pathParts = currentPath.split("/");
    const extractedProductId = pathParts[pathParts.length - 1];
    return extractedProductId;
  };

  const getProduct = async () => {
    try {
      const response = await axios.get(`${baseUrl}/show_product/${extractProductId()}`, {
        headers: { Authorization: localStorage.getItem("auth") },
      });
      setProduct(response.data);
    } catch (err) {
      alert(err?.response?.data?.error || "ERROR");
    }
  };

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    setQuantity(value);
  };



  useEffect(() => {
    getProduct();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-container">
      <div className="left-section">
        <div className="product-image">
          <img src={product.Image} alt="Product Image" style={{ width: '800px', height: 'auto' }} />
        </div>
      </div>
      <div className="middle-section">
        <div className="product-details">
          <h2 className="product-title">{product.Product_name}</h2>
          <div className="product-id">id: {extractProductId()}</div>
          <div className="product-color">
            <label htmlFor="color-select">Color:</label>
            <select id="color-select">
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </select>
          </div>
          <div className="product-size">
            <label htmlFor="size-select">Size:</label>
            <select id="size-select">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div className="product-price">${product.Price}元</div>
        </div>
      </div>
      <div className="right-section">
        <div className="product-buttons">
          <div className="wishlist-container">
            <button className="add-to-wishlist-button">Add to Wishlist</button>
          </div>
          <div className="quantity-container">
            <div className="quantity-label-container">
              <label htmlFor="quantity-input">購買數量:</label>
            </div>
            <input
              type="number"
              id="quantity-input"
              value={quantity}
              min="0"
              onChange={handleQuantityChange}
            />
          </div>
          <div className="cart-container">
            <button className="add-to-cart-button">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );


};

export default ProductShow;
