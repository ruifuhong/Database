const mysql = require("mysql");
const express = require("express");
const app = express();
const port = 3000;
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const mainRoute = require("./routes/main_route");
const cityRoute = require("./routes/city_route");
const homepageRoute = require("./routes/homepage_route");
// const shopRoute = require("./routes/shop_route");
const insertRoute = require("./routes/insert_route");
const orderRoute = require("./routes/order_route");
require("dotenv").config();

app.set("view engine", "ejs");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use("/public", express.static(__dirname + "/public"));
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.log("error");
    return;
  }
  console.log("success");
});

connection.query("SELECT 15 + 1 as solution", (err, rows, fields) => {
  if (err) throw err;
  console.log("The solution is: ", rows[0].solution);
});

app.use("/", mainRoute);
// app.use("/shop", shopRoute(connection));
app.use("/cities", cityRoute(connection));
app.use("/homepage", homepageRoute(connection));
app.use("/insert", insertRoute(connection));
app.use("/order", orderRoute(connection));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
