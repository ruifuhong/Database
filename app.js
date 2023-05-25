const mysql = require("mysql");
const express = require("express");
const app = express();
const port = 3000;
const methodOverride = require("method-override");
const cors = require("cors");
const mainRoute = require("./routes/main_route");
const cityRoute = require("./routes/city_route");
const homepageRoute = require("./routes/homepage_route");
const categoryRoute = require("./routes/category");
const categoryMenRoute = require("./routes/category_men") 
const categoryWomenRoute = require("./routes/category_women") 
const categoryKidsRoute = require("./routes/category_kids") 
require("dotenv").config();

app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render('index');
});

// app.get('/products/:category', (req, res) => {
//   res.render('category');
// });

// app.get('/', (req, res) => {
//   res.render('/member/:id/history/:category ');
// });

// app.get('/', (req, res) => {
//   res.render('/products/:category');
// });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password: 'ryan8818',
  database: 'final',
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
app.use("/cities", cityRoute(connection));
app.use("/homepage", homepageRoute(connection));
app.get("/products/:category",categoryRoute(connection));
app.get("/products/:category/men",categoryMenRoute(connection));
app.get("/products/:category/women",categoryWomenRoute(connection));
app.get("/products/:category/kids",categoryKidsRoute(connection));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

