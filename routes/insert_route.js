const express = require("express");
const router = express.Router();

module.exports = (connection) => {
  // GET 路由處理 /insert 頁面的請求
  router.get("/", async (req, res) => {
    try {
      res.send("This is the insert route");
    } catch (e) {
      return res
        .status(500)
        .send("An error occurred when handling the request");
    }
  });

  router.post("/", (req, res) => {
    const { productId, productName, productPrice, productImage } = req.body;

    try {
      console.log("阿哈哈");
      const sql = `INSERT INTO final.trying (Product_id, Product_name, Storage_quantity, Price, Image, Category) VALUES (?, ?, 5, ?, ?, 'KID')`;
      const values = [productId, productName, productPrice, productImage];

      connection.query(sql, values, (error, results) => {
        if (error) {
          console.error("資料插入失敗:", error);
          res.status(500).json({ message: "資料插入失敗" });
        } else {
          console.log("資料插入成功");
          res.json({ message: "資料插入成功" });
        }
      });
    } catch (e) {
      console.error("資料插入失敗:", e);
      res.status(500).json({ message: "資料插入失敗" });
    }
  });
  return router;
};
