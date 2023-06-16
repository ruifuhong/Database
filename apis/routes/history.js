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

  
   
};
