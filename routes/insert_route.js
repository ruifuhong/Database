const express = require("express");
const router = express.Router();

module.exports = (connection) => {
  router.post("/", (req, res) => {
    console.log(req.body);
    const { productId, productName, quantity, productPrice, productImage } =
      req.body;

    try {
      console.log("阿哈哈");
      const sql = `INSERT INTO final.trying (Product_id, Product_name, Quantity, Price, Image, Category) VALUES (?, ?, ?, ?, ?, 'KID')`;
      const values = [
        productId,
        productName,
        quantity,
        productPrice,
        productImage,
      ];

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
