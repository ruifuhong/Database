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

  return router;
};
