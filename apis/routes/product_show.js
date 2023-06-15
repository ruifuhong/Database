const connection = require("../db");

module.exports = (router) => {
  router.get("/show_product/:productId", async (req, res) => {
    try {
      console.log(req.params);
      const productId = req.params.productId;
      if (!productId) {
        return res.status(400).send("Invalid product ID");
      }
      console.log(productId);
      console.log("1111111111111111111111111111111");
      let sqlCommand = `SELECT * FROM product WHERE Product_id = ${productId}`;

      connection.query(sqlCommand, (err, products, fields) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error occurred when searching the data");
        }
        if (products.length === 0) {
          return res.status(404).send("Product not found");
        }
        return res.json(products[0]);
      });
    } catch (e) {
      console.log(e);
      return res.status(500).send("Error occurred when searching the data");
    }
  });

  router.post("/addwishproduct", (req, res) => {
    const { member, product_id, selectedColor, selectedSize, category } =
      req.body;

    try {
      const sql = `INSERT INTO wish_product (Customer, Product_id, Color, Size, Category) VALUES (?, ?, ?, ?, ?)`;
      const values = [
        member,
        product_id,
        selectedColor,
        selectedSize,
        category,
      ];

      connection.query(sql, values, (error, results) => {
        if (error) {
          console.error("Failed to insert data:", error);
          res.status(500).json({ error: "INSERT_FAILED" });
        } else {
          console.log("Data inserted successfully");
          res.json({ message: "Data inserted successfully" });
        }
      });
    } catch (error) {
      console.error("Failed to insert data:", error);
      res.status(500).json({ error: "INSERT_FAILED" });
    }
  });
};
