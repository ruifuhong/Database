const express = require("express");
const app = express();
const port = 3000;
const mainRoute = require("./routes/main_route");

app.set("view engine", "ejs");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/", mainRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
