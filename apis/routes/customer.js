const connection = require("../db");
const { verify } = require("../verify");

module.exports = (router) => {
    router.get("/customer", (req, res) => {
        console.log("進入customer");
        //console.log(req.headers);
        const Customer = verify(req);
        if (Customer === false) return res.status(500).json({ error: "INVALID_USER" });
        try {
            const sql = `SELECT * FROM final.customer WHERE username = '${Customer}'`;
            connection.query(sql, (error, data) => {
                if (error) {
                    res.status(500).json({ error });
                } else {
                    res.json(data);
                }
            });
        } catch (e) {
            return res.status(400).send("error occurred when deleting the data");
        }
    });
};
