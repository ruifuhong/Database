const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

/**
 *
 * @param {mysql.Connection} connection
 * @param {string} sqlCommand
 * @returns
 */
const connectionPromise = (sqlCommand) => {
    return new Promise((resolve, reject) => {
        connection.query(sqlCommand, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
};

const migration = async () => {
    const sqls = await fs.promises.readdir("../db");
    for (const sql of sqls) {
        const content = (await fs.promises.readFile(path.join("../db", sql))).toString();
        await connectionPromise(connection, content);
    }
};

const connection = mysql.createConnection({
    host: "mysql",
    user: "root",
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true,
});

connection.connect((err) => {
    if (err) {
        console.log("error");
        return;
    }
    console.log("success");
});

connection.query("SHOW TABLES LIKE 'category'", async (err, data) => {
    if (err) throw "DATABASE CONNECTION FAILED";
    if (!Array.isArray(data) || data.length === 0) {
        console.warn("NO INIT DATABASE FOUND, START MIGRATION");
        await migration();
        console.log("MIGRATION FINISHED");
    }
});

module.exports = connection;
exports = module.exports;
exports.connectionPromise = connectionPromise;
