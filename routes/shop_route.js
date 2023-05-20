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

  // POST 路由處理表單提交至 /shopend
  router.post("/shopend", async (req, res) => {
    try {
      console.log(req.body);
      // const {
      //   Product_id = item.Product_id,
      //   Product_name = item.Product_name,
      //   Price = item.Price,
      //   Image = item.Image,
      // } = req.body;

      // const query = `INSERT INTO trying (Product_id, Product_name, Storage_quantity, Price, Image, Category) VALUES (${Product_id}, '${Product_name}', 100, ${Price}, '${Image}', 'KIDS')`;

      // connection.query(query, (err, result) => {
      //   if (err) {
      //     console.error("Error inserting data into product_purchased:", err);
      //     return res.status(500).send("Error occurred when inserting data");
      //   }

      //   if (result.affectedRows) {
      //     console.log("Data inserted into product_purchased successfully");
      //     return res.render("shop_end", {
      //       Product_id: 1,
      //       Color: "red",
      //       Size: "m",
      //       Category: "KIDS",
      //     });
      //   } else {
      //     console.error("No rows affected");
      //     return res.status(500).send("Error occurred when inserting data");
      //   }
      // });
    } catch (e) {
      return res.status(400).send(e.message);
    }
  });

  return router;
};

// const express = require("express");
// const router = express.Router();

// module.exports = (connection) => {
//   router.get("/", async (req, res) => {
//     try {
//       let shops = connection.query(
//         "SELECT * FROM final.product",
//         (err, shops, fields) => {
//           if (err) {
//             return res
//               .status(500)
//               .send("error occurred when searching the data");
//           }
//           return res.render("shop", { shops });
//         }
//       );
//     } catch (e) {
//       return res.status(500).send("error occurred when searching the data");
//     }
//   });
//   return router;
// };
