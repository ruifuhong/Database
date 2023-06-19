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
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [colorOptions, setColorOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const currentPath = window.location.pathname;

  const getMember = async (category) => {
    try {
      let data = await axios.get(`${baseUrl}/customer`, {
        params: category ? { category } : {},
        headers: { Authorization: localStorage.getItem("auth") },
      });
      setMember(data.data[0].Username);
    } catch (err) {
      alert(err?.response?.data?.error || "ERROR");
    }
  };


  const getItemInfo = async () => {
    try {
      const extractedProductId = extractProductId();

      const [colorInfo, sizeInfo] = await Promise.all([
        axios.get(`${baseUrl}/product/getcolor`, {
          params: { Product_id: Number(extractedProductId)},
          headers: { Authorization: localStorage.getItem("auth") },
        }),
        axios.get(`${baseUrl}/product/getsize`, {
          params: { Product_id: Number(extractedProductId)},
          headers: { Authorization: localStorage.getItem("auth") },
        }),
      ]);
      setColorOptions(["", ...colorInfo.data]);
      setSizeOptions(["", ...sizeInfo.data]);
      setSelectedColor(colorInfo.data[0] || "");
      setSelectedSize(sizeInfo.data[0] || "");
    } catch (err) {
      alert(err?.response?.data?.error || "ERROR");
    }
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const addToWishList = async () => {
    try {
      const extractedProductId = extractProductId();

      const requestBody = {
        Product_id: Number(extractedProductId),
        Color: selectedColor,
        Size: selectedSize,
        Category: product.Category,
      };

      await axios.post(`${baseUrl}/wish`, requestBody, {
        headers: { Authorization: localStorage.getItem("auth") },
      });

      console.log("Add to wishlist successful");
      alert("Add to wishlist successful");
    } catch (err) {
      console.error("Add to wishlist error:", err);
      alert(err?.response?.data?.error || "請登錄");
      if (err.response.data.redirectUrl) {
        window.location.href = err.response.data.redirectUrl;
      }
    }
  };

  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  };

  const addProduct = async () => {
    const randomString = generateRandomString(20);
    try {
      const requestBody = {
        Item: product.Product_name,
        Product_id: extractProductId(),
        Color: selectedColor,
        Size: selectedSize,
        Category: product.Category,
        Quantity: quantity,
        Price: product.Price * quantity
      };

      await axios.post(`${baseUrl}/cart`, requestBody, {
        headers: { Authorization: localStorage.getItem("auth") },
      });
      alert("cart Success");
    } catch (err) {
      alert(err?.response?.data?.error || "請登錄");
      if (err.response.data.redirectUrl) {
        window.location.href = err.response.data.redirectUrl;
      }
    }
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
    getItemInfo();
    getProduct();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <header className="bg-dark py-5">
      <div className="container px-4 px-lg-5 my-5">
        <div className="text-center text-white">
          <h1 className="display-4 fw-bolder">Shop in style</h1>
          <p className="lead fw-normal text-white-50 mb-0">Welcome to Wu4Shan Shopping Website</p>
        </div>
      </div>
    </header>

    <div className="product-container">
      <div className="left-section">
        <div className="product-image">
          <img
            src={product.Image}
            alt="Product Image"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
      <div className="middle-section">
        <div className="product-details">
          <h2 className="product-title">{product.Product_name}</h2>
          <br/>
          <div className="product-id">ID : {extractProductId()}</div>
          <div className="product-color">
            <label htmlFor="color-select">Color : </label>
            <select id="color-select" value={selectedColor} onChange={handleColorChange}>
            {colorOptions.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
          </div>
          <div className="product-size">
            <label htmlFor="size-select">Size : </label>
            <select id="size-select" value={selectedSize} onChange={handleSizeChange}>
            {sizeOptions.map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </select>
          </div>
          <br/>
          <div className="product-price">
            Total Price : ${product.Price * quantity}
          </div>
        </div>
      </div>
      <div className="right-section">
        <div className="product-buttons">
          <div className="wishlist-container">
            <button
              className="add-to-wishlist-button"
              onClick={addToWishList}
            >
              Add to Wishlist
            </button>
          </div>
          <div className="quantity-container">
            <div className="quantity-label-container">
              <label htmlFor="quantity-input">Quantity:</label>
            </div>
            <input
              type="number"
              id="quantity-input"
              value={quantity}
              min={1}
              onChange={handleQuantityChange}
            />
          </div>
          <div className="cart-container">
            <button className="add-to-cart-button" onClick={addProduct}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductShow;
