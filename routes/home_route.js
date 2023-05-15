const express = require("express");
const router = express.Router();

module.exports = (connection) => {
  router.get("/", async (req, res) => {
    //console.log('in')
    try {
      connection.query("SELECT * FROM final.product", (err, items, fields) => {
        if (err) {
          return res.status(500).send("error occurred when searching the data___if內");
        }
        return res.render("home", { items });
      });
    } catch (e) {
      return res.status(500).send("error occurred when searching the data____123");
    }
  });

  return router;
};