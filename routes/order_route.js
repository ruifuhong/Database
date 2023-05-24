const express = require("express");
const router = express.Router();

module.exports = (connection) => {
  router.get("/", async (req, res) => {
    try {
      connection.query("SELECT * FROM final.trying", (err, orders, fields) => {
        if (err) {
          return res.status(500).send("error occurred when searching the data");
        }
        console.log("i am here");
        return res.render("orders", { orders });
      });
    } catch (e) {
      return res.status(500).send("error occurred when searching the data");
    }
  });

  router.delete("/:productId", (req, res) => {
    const { productId } = req.body;

    try {
      const sql = `DELETE FROM trying WHERE Product_id = ?`;
      const values = productId;

      connection.query(sql, values, (error, results) => {
        if (error) {
          console.error("刪除記錄時發生錯誤:", error);
          res.status(500).json({ message: "刪除記錄失敗" });
        } else {
          res.json({ message: `成功刪除 ID 為 ${productId} 的記錄` });
        }
      });
    } catch (e) {
      return res.status(400).send("error occurred when deleting the data");
    }
  });

  return router;
};
