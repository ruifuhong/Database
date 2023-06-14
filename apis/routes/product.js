const connection = require("../db");

module.exports = (router) => {
  router.get("/product", async (req, res) => {
    try {
      let sqlCommand = "SELECT * FROM product";
      if (req.query.category)
        sqlCommand += ` where category = '${req.query.category}'`;
      connection.query(sqlCommand, (err, shops, fields) => {
        console.log(err);
        if (err)
          return res.status(500).send("error occurred when searching the data");
        return res.json(shops);
      });
    } catch (e) {
      return res.status(500).send("error occurred when searching the data");
    }
  });

  // router.post("/wish_product", (req, res) => {
  //   console.log("Authorization header:", req.headers.authorization);
  //   const { member, product_id, selectedColor, selectedSize, category } =
  //     req.body;
  //   try {
  //     const sql = `INSERT INTO wish_product (Customer, Product_id, Color, Size, Category) VALUES (?, ?, ?, ?, ?)`;
  //     const values = [
  //       member,
  //       product_id,
  //       selectedColor,
  //       selectedSize,
  //       category,
  //     ];

  //     connection.query(sql, values, (error, results) => {
  //       if (error) {
  //         console.error("資料插入失敗:", error);
  //         res.status(500).json({ message: "資料插入失敗" });
  //       } else {
  //         console.log("資料插入成功");
  //         res.json({ message: "資料插入成功" });
  //       }
  //     });
  //   } catch (e) {
  //     console.error("資料插入失敗:", e);
  //     res.status(500).json({ message: "資料插入失敗" });
  //   }
  // });
};
