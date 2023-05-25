const express = require("express");
const router = express.Router();

module.exports = (connection) => {
  router.get("/products/:category/women",  (req, res) => {
    try {
        
      connection.query(
        "SELECT * FROM final.product where category ='WOMEN'",
        (err, rows, fields) => {
          if (err) {
            return res
              .status(500)
              .send("error occurred when searching the data");
          }
           
           res.render('category_women', { 'women':rows});
          // return res.send(rows);
        }
      );
    } catch (e) {
      return res.status(500).send("error occurred when searching the data");
    }
  });
  return router;
};