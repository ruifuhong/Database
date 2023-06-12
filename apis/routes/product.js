const connection = require("../db");

module.exports = (router) => {
    router.post("/product", (req, res) => {
        const { productId, productName, quantity, productPrice, productImage, category = "KID" } = req.body;
        try {
            const sql = `INSERT INTO product (Product_id, Product_name, Storage_quantity, Price, Image, Category) VALUES (?, ?, ?, ?, ?, ?)`;
            const values = [productId, productName, quantity, productPrice, productImage, category];

            connection.query(sql, values, (error, results) => {
                if (error) {
                    console.error("資料插入失敗:", error);
                    res.status(500).json({ message: "資料插入失敗" });
                } else {
                    console.log("資料插入成功");
                    res.json({ message: "資料插入成功" });
                }
            });
        } catch (e) {
            console.error("資料插入失敗:", e);
            res.status(500).json({ message: "資料插入失敗" });
        }
    });
    router.get("/product", async (req, res) => {
        try {
            let sqlCommand = "SELECT * FROM product";
            if (req.query.category) sqlCommand += ` where category = '${req.query.category}'`;
            connection.query(sqlCommand, (err, shops, fields) => {
                console.log(err);
                if (err) return res.status(500).send("error occurred when searching the data");
                return res.json(shops);
            });
        } catch (e) {
            return res.status(500).send("error occurred when searching the data");
        }
    });

    router.get("/product/color", async (req, res) => {
        try {
            let sqlCommand = `SELECT * FROM product_color where Product_id = ${req.query.Product_id}`;
            connection.query(sqlCommand, (err, colors) => {
                if (err) return res.status(500).send("error occurred when searching the data");
                return res.json(colors.map((item) => item.Color));
            });
        } catch (e) {
            console.error({ error });
            return res.status(500).send("error occurred when searching the data");
        }
    });

    router.get("/product/size", async (req, res) => {
        try {
            let sqlCommand = `SELECT * FROM product_size where Product_id = ${req.query.Product_id}`;
            connection.query(sqlCommand, (err, colors) => {
                if (err) return res.status(500).send("error occurred when searching the data");
                return res.json(colors.map((item) => item.Size));
            });
        } catch (e) {
            console.error({ error });
            return res.status(500).send("error occurred when searching the data");
        }
    });
};
