import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../stylesheets/show_product.css";
const baseUrl = process.env.REACT_APP_BASE_URL;

const ProductShow = () => {
  const [product, setProduct] = useState(null);
  const [member, setMember] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [id, setId] = useState(0);
  const [selectedColor, setSelectedColor] = useState("red");
  const [selectedSize, setSelectedSize] = useState("small");
  const currentPath = window.location.pathname;

  const getMember = async (category) => {
    console.log("member.jsx");
    try {
      console.log("member.jsx_try");
      let data = await axios.get(`${baseUrl}/customer`, {
        params: category ? { category } : {},
        headers: { Authorization: localStorage.getItem("auth") },
      });

      console.log("data.data[0]", data.data[0]);
      setMember(data.data[0].Username);
      console.log(data.data);
    } catch (err) {
      alert(err?.response?.data?.error || "ERROR");
    }
  };

  const addToWishList = async () => {
    try {
      console.log("trying");
      const extractedProductId = extractProductId();

      const requestBody = {
        member: member,
        product_id: Number(extractedProductId),
        selectedColor: selectedColor,
        selectedSize: selectedSize,
        category: product.Category,
      };

      await axios.post(`${baseUrl}/addwishproduct`, requestBody, {
        headers: { Authorization: localStorage.getItem("auth") },
      });

      console.log("Add to wishlist successful");
      // 根据后端返回的结果进行处理
    } catch (err) {
      console.error("Add to wishlist error:", err);
      alert(err?.response?.data?.error || "ERROR");
    }
  };

  // const addToWishList = async () => {
  //   try {
  //     console.log("trying");
  //     const extractedProductId = extractProductId();

  //     const requestBody = {
  //       member: member,
  //       product_id: Number(extractedProductId),
  //       selectedColor: selectedColor,
  //       selectedSize: selectedSize,
  //       category: product.Category,
  //     };

  //     console.log("member", member, typeof member);
  //     console.log("add to wish list");
  //     console.log("id", extractedProductId, typeof extractedProductId);
  //     console.log("selected color", selectedColor, typeof selectedColor);
  //     console.log("selected size", selectedSize, typeof selectedSize);
  //     console.log("category", product.Category, typeof product.Category);

  //     const response = await axios.post(
  //       `${baseUrl}/addwishproduct`,
  //       requestBody,
  //       {
  //         headers: { Authorization: localStorage.getItem("auth") },
  //       }
  //     );

  //     console.log("Add to wishlist response:", response.data);
  //     // 根據後端返回的結果進行處理
  //   } catch (err) {
  //     console.log("我跟你說你寫錯了");
  //     console.error("Add to wishlist error:", err);
  //     alert(err?.response?.data?.error || "ERROR");
  //   }
  // };

  const addToCart = () => {
    console.log("member", member);
    console.log("add to cart");
    console.log("id", extractProductId());
    console.log("selected color", selectedColor);
    console.log("selected size", selectedSize);
    console.log("category", product.Category);
    console.log("quantity", quantity);
    console.log("total price", product.Price * quantity);
  };

  const extractProductId = () => {
    const pathParts = currentPath.split("/");
    const extractedProductId = pathParts[pathParts.length - 1];
    return extractedProductId;
  };

  const getProduct = async () => {
    const extractedProductId = extractProductId();
    try {
      const response = await axios.get(
        `${baseUrl}/show_product/${extractProductId()}`,
        {
          headers: { Authorization: localStorage.getItem("auth") },
        }
      );
      console.log("response.data ", response.data);
      setProduct(response.data);
      setId(extractedProductId);
    } catch (err) {
      alert(err?.response?.data?.error || "ERROR");
    }
  };

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    setQuantity(value);
  };

  useEffect(() => {
    getMember();
  }, []);

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
          <img
            src={product.Image}
            alt="Product Image"
            style={{ width: "800px", height: "auto" }}
          />
        </div>
      </div>
      <div className="middle-section">
        <div className="product-details">
          <h2 className="product-title">{product.Product_name}</h2>
          <div className="product-id">id: {extractProductId()}</div>
          <div className="product-color">
            <label htmlFor="color-select">Color:</label>
            <select
              id="color-select"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </select>
          </div>
          <div className="product-size">
            <label htmlFor="size-select">Size:</label>
            <select
              id="size-select"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div className="product-price">總共${product.Price * quantity}元</div>
        </div>
      </div>
      <div className="right-section">
        <div className="product-buttons">
          <div className="wishlist-container">
            <button className="add-to-wishlist-button" onClick={addToWishList}>
              Add to Wishlist
            </button>
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
            <button className="add-to-cart-button" onClick={addToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShow;
