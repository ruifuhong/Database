const express = require("express");
const router = express.Router();

module.exports = (connection) => {
  router.get("/", async (req, res) => {
    try {
      let cities = connection.query(
        "SELECT * FROM final.product",
        (err, products, fields) => {
          if (err) {
            return res
              .status(500)
              .send("error occurred when searching the data");
          }
          return res.render("homepage", { products });
        }
      );
    } catch (e) {
      return res.status(500).send("error occurred when searching the data");
    }
  });

  return router;
};
