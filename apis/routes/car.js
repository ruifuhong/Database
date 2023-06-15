const connection = require("../db");
const { verify } = require("../verify");

const checkWishProductDuplicate = async (Customer, Product_id) => {
    const sqlCommand = `SELECT * FROM wish_product WHERE Customer = ${Customer} AND Product_id = ${Product_id}`;
    try {
        const result = await connection.connectionPromise(sqlCommand);
        return result.length !== 0;
    } catch (err) {
        console.error(err);
        throw "SELECT_WISH_ERROR";
    }
};

module.exports = (router) => {
    router.get("/wish", (req, res) => {
        try {
            const Customer = verify(req);
            if (Customer === false) {
                res.status(400).json({ error: "INVALID_USER" });
                return;
            }
            const sql = `SELECT wish_product.Product_id, wish_product.Color, wish_product.Size, product.Product_name, Price, Image FROM wish_product 
            JOIN product ON product.Product_id = wish_product.Product_id 
            WHERE Customer = '${Customer}'`;
            connection.query(sql, (error, data) => {
                if (error) {
                    res.status(500).json({ error });
                } else {
                    res.json(data);
                }
            });
        } catch (e) {
            res.status(500).send("error occurred when getting the data");
        }
    });

    router.post("/wish", async (req, res) => {
        const Customer = verify(req);
        if (Customer === false) {
            res.status(400).json({ error: "INVALID_USER" });
            return;
        }
        try {
            const { Product_id, Color, Size, Category } = req.body;
            if (Customer === undefined || Product_id === undefined)
                return res.status(400).json({ error: "INVALID INPUT" });
            const exist = await checkWishProductDuplicate(Customer, Product_id);
            if (exist === true) return res.status(400).json({ error: "PRODUCT ALREADY IN WISH CAR" });
            const sql = `INSERT INTO wish_product (Customer, Product_id, Color, Size, Category) VALUES (?, ?, ?, ?, ?)`;
            connection.query(sql, [Customer, Product_id, Color, Size, Category], (error, data) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ error });
                } else {
                    res.json(data);
                }
            });
            console.log("hello");
        } catch (e) {
            res.status(500).send("error occurred when creating the data");
        }
    });

    router.post("/cart", async (req, res) => {
        const Customer = verify(req);
        if (Customer === false) {
            res.status(400).json({ error: "INVALID_USER" });
            return;
        }
        try {
            const { Order_id, Item, Product_id, Color, Size, Category, Quantity, Price} = req.body;
            console.log("body",req.body);
            if (Customer === undefined || Product_id === undefined)
                return res.status(400).json({ error: "INVALID INPUT" });
            const exist = await checkWishProductDuplicate(Customer, Product_id);
            if (exist === true) return res.status(400).json({ error: "ALREADY IN CAR" });
            const sql = `INSERT INTO order_item (Order_id, Item, Product_id, Color, Size, Category, Quantity, Price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            connection.query(sql, [Order_id, Item, Product_id, Color, Size, Category, Quantity, Price], (error, data) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ error });
                } else {
                    res.json(data);
                }
            });
            console.log("hello");
        } catch (e) {
            res.status(500).send("error occurred when creating the data");
        }
    });


    router.put("/wish", async (req, res) => {
        const Customer = verify(req);
        if (Customer === false) {
            res.status(400).json({ error: "INVALID_USER" });
            return;
        }
        try {
            const { Product_id, Color, Size } = req.body;
            const exist = await checkWishProductDuplicate(Customer, Product_id);
            if (exist === false) return res.status(400).json({ error: "PRODUCT NOT EXIST" });
            const sql = `UPDATE wish_product SET Color = ?, Size = ? WHERE Customer = ? AND Product_id = ?`;
            connection.query(sql, [Color, Size, Customer, Product_id], (error, data) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ error });
                } else {
                    res.json(data);
                }
            });
        } catch (e) {
            res.status(500).send("error occurred when updating the data");
        }
    });

    router.delete("/wish", async (req, res) => {
        const Customer = verify(req);
        if (Customer === false || !req.query.Product_id) {
            res.status(400).json({ error: "INVALID_PARAMS" });
            return;
        }
        try {
            const sql = `DELETE FROM wish_product WHERE Customer = ? AND Product_id = ?`;
            connection.query(sql, [Customer, req.query.Product_id], (error, data) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ error });
                } else {
                    res.json(data);
                }
            });
        } catch (e) {
            res.status(500).send("error occurred when deleting the data");
        }
    });
};
