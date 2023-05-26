const connection = require("../db");
const { verify } = require("../verify");

module.exports = (router) => {
    router.get("/car", (req, res) => {
        console.log(req.headers);
        const Customer = verify(req);
        console.log(Customer);
        if (Customer === false) return res.status(500).json({ error: "INVALID_USER" });
        try {
            const sql = `SELECT * FROM wish_product WHERE Customer = '${Customer}'`;
            connection.query(sql, (error, data) => {
                if (error) {
                    res.status(500).json({ error });
                } else {
                    console.log(data);
                    res.json(data);
                }
            });
        } catch (e) {
            return res.status(400).send("error occurred when deleting the data");
        }
    });

    router.post("/car", (req, res) => {
        const Customer = verify(req);
        if (Customer === false) return res.status(500).json({ error: "INVALID_USER" });
        try {
            const { Product_id, Color, Size, Category } = req.body;
            const sql = `INSERT INTO wish_product (Customer, Product_id, Color, Size, Category) VALUES (?, ?, ?, ?, ?)`;
            connection.query(sql, [Customer, Product_id, Color, Size, Category], (error, data) => {
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
