const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));

require("./routes/product")(app);
require("./routes/order")(app);
require("./routes/car")(app);
require("./routes/user")(app);
require("./routes/customer")(app);

app.listen(port, "0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
