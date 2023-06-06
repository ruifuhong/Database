const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "mysql",
    user: "root",
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
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

module.exports = connection;
