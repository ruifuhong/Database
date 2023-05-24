const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");



module.exports = (connection) => {

  router.get("/", (req, res) => {
    res.render("signup");
  });

  router.post("/", async (req, res) => {
    const { username, email, lastName, firstName, address, password, confirmPassword } = req.body;
    console.log( username, email, lastName, firstName, address, password, confirmPassword)
    try {
      console.log( username, email, lastName, firstName, address, password, confirmPassword)
      // 检查密码和确认密码是否匹配
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "密码和确认密码不匹配" });
      }

      // 生成密码的哈希值
      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = "INSERT INTO final.customer (username, password, First_name, Last_name, registration_date , address) VALUES (?, ?, ?, ?, NOW(), ?)";
      const values = [username, hashedPassword, firstName, lastName, address];

      connection.query(sql, values, (error, results) => {
        if (error) {
          console.error("插入数据失败:", error);

          res.status(500).json({ message: "注册失败" });
          res.redirect("/signup");
        } else {
          console.log("注册成功");
          res.json({ message: "注册成功" });
          res.redirect("/");

        }
      });
    } catch (e) {
      console.error("注册失败:", e);
      res.status(500).json({ message: "注册失败" });
      res.redirect("/signup");
    }
  });

  return router;
};

