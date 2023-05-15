const express = require("express");
const router = express.Router();

router.get("/:userId", (req, res) => {
  // 从URL参数中获取userId
  const userId = req.params.userId;
  // 在此处可以执行相应的逻辑，例如从数据库中获取用户信息

  // 渲染用户个人页面，并将userId传递给ejs模板
  res.render("member", { userId: userId });
});

module.exports = router;