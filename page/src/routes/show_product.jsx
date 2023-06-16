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
    } catch (err) {
      console.error("Add to wishlist error:", err);
      alert(err?.response?.data?.error || "ERROR");
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

  // const addProduct = async () => {
  //   const randomString = generateRandomString(20);
  //   try {
  //       console.log("total price", product.Price * quantity);
  //       console.log("Order_id",randomString );

  //       const requestBody = {
  //               Order_id: randomString,
  //               Total_price: product.Price * quantity,
  //       };

  //       await axios.post(`${baseUrl}/cart`, requestBody, {
  //         headers: { Authorization: localStorage.getItem("auth") },
  //       });
  //       alert("cart Success");
  //   } catch (err) {
  //       alert(err?.response?.data?.error || "ERROR");
  //   }
  // };

  const addProduct = async () => {
    const randomString = generateRandomString(20);
    try {
        console.log("total price", product.Price * quantity);

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
        alert(err?.response?.data?.error || "ERROR");
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
            <button className="add-to-cart-button" onClick={addProduct}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShow;
