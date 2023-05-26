const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");



module.exports = (connection) => {

  router.get("/", (req, res) => {
    res.render("signup", { errorMessage: "" });
  });

  router.post("/", async (req, res) => {
    console.log(req.body)
    const { username, lastName, firstName, address, password, confirmPassword } = req.body;
    //const { username, email, lastName, firstName, address, password, confirmPassword } = req.body;
    console.log( username, lastName, firstName, address, password, confirmPassword)
    try {
      // 检查密码和确认密码是否匹配
      if (password !== confirmPassword) {
        console.error("密码和确认密码不匹配", error);
        res.render("signup", { errorMessage: "密码和确认密码不匹配 "});
        //return res.status(400).json({ message: "密码和确认密码不匹配" });
         res.redirect("/signup?errorMessage=密码和确认密码不匹配");
      }

      // 生成密码的哈希值
      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = "INSERT INTO final.customer (username, password, First_name, Last_name, Joined_since , address) VALUES (?, ?, ?, ?, NOW(), ?)";
      const values = [username, hashedPassword, firstName, lastName, address];

      connection.query(sql, values, (error, results) => {
        if (error) {
          console.error("插入数据失败:", error);
          res.render("signup", { errorMessage: "插入数据失败" });
          //return res.status(500).json({ message: "注册失败" });
           res.redirect("/signup?errorMessage=插入数据失败");



        } else {
          console.log("注册成功");
          //res.json({ message: "注册成功" });
          res.redirect("/?message=注册成功");

        }
      });
    } catch (e) {
      console.error("注册失败:", e);
      res.render("signup", { errorMessage: "注册失败" });
      //return res.status(500).json({ message: "注册失败" });
       res.redirect("/signup?errorMessage=注册失败");
    }
  });

  return router;
};

