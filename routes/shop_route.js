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
      // 在這裡處理表單提交的資料
      console.log(req.body);
      return res.render("shop_end");
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
