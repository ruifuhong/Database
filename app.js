const mysql = require("mysql");
const express = require("express");
const app = express();
const port = 3000;
const methodOverride = require("method-override");
const cors = require("cors");
const mainRoute = require("./routes/main_route");
//const cityRoute = require("./routes/city_route");
const homepageRoute = require("./routes/homepage_route");

require("dotenv").config();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
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

app.use("/test", mainRoute);
app.use("/homepage", homepageRoute(connection));



const loginRoute = require("./routes/login_route");
app.use("/login", loginRoute);


const homeRoute = require("./routes/home_route");
app.use("/", homeRoute(connection));
app.use("/home", homeRoute(connection));


const signupRoute = require("./routes/signup_route");
app.use("/signup", signupRoute);



const memberRouter = require('./routes/member_route')(connection);
app.use('/member', memberRouter);


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('username:'+username);
  console.log('password:'+password);
  // 在这里进行用户名和密码的验证逻辑
  if (username === 'user123' && password === '123') {
    // 验证成功
    const userId = 'user123';
    res.redirect('/member/' + userId);
  } else {
    // 验证失败
    const errorMessage = '用户名或密码错误'; // 错误信息
    res.redirect('/login?error=' + encodeURIComponent(errorMessage));
  }
});




//INSERT INTO final.customer (Username, Password, First_name, Last_name, Joined_since, Address)
//VALUES ('user123', '$10$nkbf4g5I3e3tfHKHmfp8xegSJWHdkLpB30ULEyENa2dyvhirg5TkS', 'WU', '4_3', '2023-05-08', '動物園');






app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
