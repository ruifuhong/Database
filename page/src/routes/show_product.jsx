import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const baseUrl = process.env.REACT_APP_BASE_URL;


const ProductShow = () => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { productId } = useParams();

  const getProduct = async () => {
    try {
      const response = await axios.get(`${baseUrl}/show_product/${productId}`, {
        headers: { Authorization: localStorage.getItem("auth") },
      });
      setProduct(response.data);
    } catch (err) {
      alert(err?.response?.data?.error || "ERROR");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <h2>{product.Product_name}</h2>
      <p>Product ID: {product.Product_id}</p>
      <p>Storage_quantity: {product.Storage_quantity}</p>
      <p>Price: {product.Price}</p>
      <p>Image: {product.Image} 元</p>
      <p>Category: {product.Category} </p>

      <button onClick={() => navigate("/categories")}>Back to Categories</button>
    </div>
  );
};

export default ProductShow;