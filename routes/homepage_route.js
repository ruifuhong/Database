const express = require("express");
const router = express.Router();

module.exports = (connection) => {
  router.get("/", async (req, res) => {
    try {
      connection.query("SELECT * FROM final.trying", (err, items, fields) => {
        if (err) {
          return res.status(500).send("error occurred when searching the data");
        }
        return res.render("homepage", { items });
      });
    } catch (e) {
      return res.status(500).send("error occurred when searching the data");
    }
  });

  return router;
};
