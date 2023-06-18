const connection = require("../db");
const { verify } = require("../verify");



module.exports = (router) => {
   

    router.post("/history", async (req, res) => {
        const Customer = verify(req);
        if (Customer === false) {
            res.status(400).json({ error: "INVALID_USER" });
            return;
        }
        try {
            const {Total_price } = req.body;
            if (Customer === undefined)
                return res.status(400).json({ error: "INVALID INPUT" });
            // const exist = await checkWishProductDuplicate(Customer, Product_id);
            // if (exist === true) return res.status(400).json({ error: "PRODUCT ALREADY IN WISH CAR" });
            const sql = `INSERT INTO orderlist (Order_id, Customer, Total_price) VALUES (?, ?, ?)`;
            connection.query(sql, [Order_id, Customer, Total_price], (error, data) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ error });
                } else {
                    res.json(data);
                }
            });
        } catch (e) {
            res.status(500).send("error occurred when creating the data");
        }
    });

    router.get("/history", (req, res) => {
        try {
            const Customer = verify(req);
            if (Customer === false) {
                res.status(400).json({ error: "INVALID_USER" });
                return;
            }
            //const sql = `SELECT * FROM final.product_purchased WHERE Customer = '${Customer}'`;

            
            const sql = `SELECT product_purchased.Customer, product.Product_name ,product_purchased.Product_id, product_purchased.Color, product_purchased.Size, product.Price, product_purchased.Purchase_date
                        FROM  product_purchased
                        JOIN   product
                        ON product_purchased.Product_id = product.Product_id
                        WHERE product_purchased.Customer = '${Customer}'`;

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

};
