const express = require("express");
const router = express.Router();

module.exports = (connection) => {
  router.get("/products/:category",  (req, res) => {
    try {
        
      connection.query(
        "SELECT * FROM final.product",
        (err, rows, fields) => {
          if (err) {
            return res
              .status(500)
              .send("error occurred when searching the data");
          }
           
           res.render('category', { 'products':rows});
          // return res.send(rows);
        }
      );
    } catch (e) {
      return res.status(500).send("error occurred when searching the data");
    }
  });
  return router;
};

