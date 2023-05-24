const express = require("express");
const router = express.Router();

module.exports = (connection) => {
  // GET 路由處理 /shop 頁面的請求
  router.get("/", async (req, res) => {
    try {
      let shops = connection.query(
        "SELECT * FROM final.product",
        (err, shops, fields) => {
          if (err) {
            return res
              .status(500)
              .send("error occurred when searching the data");
          }
          return res.render("shop", { shops });
        }
      );
    } catch (e) {
      return res.status(500).send("error occurred when searching the data");
    }
  });

  return router;
};
