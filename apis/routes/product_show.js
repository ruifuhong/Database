const connection = require("../db");


module.exports = (router) => {
    router.get("/show_product/:productId", async (req, res) => {
        try {
            console.log(req.params);
            const productId = req.params.productId;
            if (!productId) {
                return res.status(400).send("Invalid product ID");
            }
            console.log(productId);
            console.log('1111111111111111111111111111111');
            let sqlCommand = `SELECT * FROM product WHERE Product_id = 3`;
           
            connection.query(sqlCommand, (err, products, fields) => {

                if (err) {
                    console.log(err);
                    return res.status(500).send("Error occurred when searching the data");
                }
                if (products.length === 0) {
                    return res.status(404).send("Product not found");
                }
                return res.json(products[0]);
            });
        } catch (e) {
            console.log(e);
            return res.status(500).send("Error occurred when searching the data");
        }
    });
};