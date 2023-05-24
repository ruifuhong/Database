const express = require("express");
const router = express.Router();
module.exports = (connection) => {
  router.get("/:userId", (req, res) => {
    try {
      const userId = req.params.userId;

      connection.query(
        "SELECT * FROM final.customer WHERE Username = ?",
        [userId],
        (err, results) => {
          if (err) {
            console.log('userId,err',userId)
            console.error("從數據庫獲取用戶信息時發生錯誤:", err);
            return res.status(500).send("從數據庫獲取用戶信息時發生錯誤");
          }

          if (results.length === 0) {
            console.log('userId,results.length',userId)
            return res.status(404).send("用戶不存在");
          }

          const user = results[0];

          return res.render("member", { userId, user });
        }
      );
    } catch (e) {
      console.error("從數據庫獲取用戶信息時發生錯誤:", e);
      return res.status(500).send("從數據庫獲取用戶信息時發生錯誤");
    }
  });
  return router;
};

