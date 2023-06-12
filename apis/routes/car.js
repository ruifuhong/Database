const connection = require("../db");
const { verify } = require("../verify");

module.exports = (router) => {
    router.get("/wish", (req, res) => {
        const Customer = verify(req);
        if (Customer === false) return res.status(500).json({ error: "INVALID_USER" });
        try {
            const sql = `SELECT wish_product.Product_id, wish_product.color, wish_product.size, product.Product_name, Price, Image FROM wish_product 
            JOIN product ON product.Product_id = wish_product.Product_id 
            WHERE Customer = '${Customer}'`;
            connection.query(sql, (error, data) => {
                if (error) {
                    res.status(500).json({ error });
                } else {
                    if (data) console.log(data);
                    res.json(data);
                }
            });
        } catch (e) {
            return res.status(400).send("error occurred when deleting the data");
        }
    });

    router.post("/wish", (req, res) => {
        const Customer = verify(req);
        if (Customer === false) return res.status(500).json({ error: "INVALID_USER" });
        try {
            const { Product_id, Color, Size, Category } = req.body;
            const sql = `INSERT INTO wish_product (Customer, Product_id, Color, Size, Category) VALUES (?, ?, ?, ?, ?)`;
            connection.query(sql, [Customer, Product_id, Color, Size, Category], (error, data) => {
                if (error) {
                    console.log(error);
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
