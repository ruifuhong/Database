const express = require("express");
const router = express.Router();

module.exports = (connection) => {
  router.get("/", async (req, res) => {
    try {
      connection.query("SELECT * FROM final.product", (err, items, fields) => {
        if (err) {
          return res.status(500).send("error occurred when searching the data___if內");
        }
        return res.render("homepage", { items });
      });
    } catch (e) {
      return res.status(500).send("error occurred when searching the data____123");
    }
  });

  router.post("/", async (req, res) => {
    // 处理 POST 请求的逻辑
    try {
      connection.query("SELECT * FROM final.product", (err, items, fields) => {
        if (err) {
          return res.status(500).send("error occurred when searching the data___if內");
        }
        return res.render("homepage", { items });
      });
    } catch (e) {
      return res.status(500).send("error occurred when searching the data____123");
    }




  });



  return router;
};
