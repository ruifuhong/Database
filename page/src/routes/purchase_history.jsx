import React, { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

const PurchaseHistory = () => {
  const [purchases, setPurchases] = useState([]);

  const fetchPurchaseHistory = async () => {
    try {
      const response = await axios.get(`${baseUrl}/history`, {
        headers: { Authorization: localStorage.getItem("auth") },
      });
      setPurchases(response.data);
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.error || "ERROR here");
    }
  };

  useEffect(() => {
    fetchPurchaseHistory();
  }, []);

  return (
    <>
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Shop in style</h1>
            <p className="lead fw-normal text-white-50 mb-0">
              With this shop homepage template
            </p>
          </div>
        </div>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>編號</th>
              <th>商品名稱</th>
              <th>商品ID</th>
              <th>顏色</th>
              <th>尺寸</th>
              {/* <th>價格</th> */}
              <th>購買日期</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{order.Product_name}</td>
                <td>{order.Product_id}</td>
                <td>{order.Color}</td>
                <td>{order.Size}</td>
                {/* <td>{order.Price}</td> */}
                <td>{order.Purchase_date && new Date(order.Purchase_date).toLocaleDateString()}</td>
              </tr>
            ))}
</tbody>
        </table>
      </main>
    </>
  );
};

export default PurchaseHistory;
