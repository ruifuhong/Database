import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
  
  useEffect(() => {
    getProduct();
  }, []);
  
  if (!product) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="product-details">
      <h2>{product.Product_name}</h2>
      <p>productId: {extractProductId()}</p>
      <p>Product ID: {product.Product_id}</p>
      <p>Storage_quantity: {product.Storage_quantity}</p>
      <p>Price: {product.Price}元</p>
      <img className="card-img-top" src={product.Image} alt="..." />
      <p>Category: {product.Category} </p>
      <button onClick={() => navigate("/categories")}>Back to Categories</button>
    </div>
  );
};

export default ProductShow;
