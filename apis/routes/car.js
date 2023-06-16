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

const checkCartDuplicate = async (Product_id) => {
    const sqlCommand = `SELECT * FROM order_item WHERE Product_id = ${Product_id}`;
    try {
        const result = await connection.connectionPromise(sqlCommand);
        return result.length !== 0;
    } catch (err) {
        console.error(err);
        throw "SELECT_Order_Item_ERROR";
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

    // router.post("/cart", async (req, res) => {
    //     const Customer = verify(req);
    //     if (Customer === false) {
    //         res.status(400).json({ error: "INVALID_USER" });
    //         return;
    //     }
    //     try {
    //         const { Order_id,Item, Product_id, Color, Size,Category, Quantity,Price} = req.body;
    //         if (Customer === undefined )
    //             return res.status(400).json({ error: "INVALID INPUT" });
    //         const exist = await checkCartDuplicate(Product_id);
    //         if (exist === true) return res.status(400).json({ error: "ALREADY IN CAR" });
    //         const sql = `INSERT INTO order_item (Order_id,Item, Product_id, Color, Size,Category, Quantity,Price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    //         connection.query(sql, [Order_id,Item, Product_id, Color, Size,Category, Quantity,Price], (error, data) => {
    //             if (error) {
    //                 console.log(error);
    //                 res.status(500).json({ error });
    //             } else {
    //                 res.json(data);
    //             }
    //         });
    //     } catch (e) {
    //         res.status(500).send("error occurred when creating the data");
    //     }
    // });

    const insertOrderItem = (res, order_id, Item, Product_id, Color, Size, Category, Quantity, Price) => {
        const insertQuery = `INSERT INTO order_item (Order_id, Item, Product_id, Color, Size, Category, Quantity, Price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        connection.query(insertQuery, [order_id, Item, Product_id, Color, Size, Category, Quantity, Price], (error, data) => {
            if (error) {
                console.log(error);
                res.status(500).json({ error });
            } else {
                res.json(data);
            }
        });
    };

    const generateRandomString = (length) => {
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let randomString = "";
    
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomString += characters.charAt(randomIndex);
        }
    
        return randomString;
      };

    router.post("/cart", async (req, res) => {
        const Customer = verify(req);
        if (Customer === false) {
            res.status(400).json({ error: "INVALID_USER" });
            return;
        }
        try {
            const { Item, Product_id, Color, Size, Category, Quantity, Price } = req.body;
            if (Customer === undefined)
                return res.status(400).json({ error: "INVALID INPUT" });

            const checkCustomerQuery = `SELECT order_id FROM orderlist WHERE customer = ?`;
            connection.query(checkCustomerQuery, [Customer], (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ error });
                } else {
                    if (results.length === 0) {
                        // Customer does not exist in orderlist table, generate random order_id
                        const order_id = generateRandomString(15);
                        const insertQuery = `INSERT INTO orderlist (order_id, customer, total_price) VALUES (?, ?, ?)`;
                        connection.query(insertQuery, [order_id, Customer, Price], (error, data) => {
                            if (error) {
                                console.log(error);
                                res.status(500).json({ error });
                            } else {
                                console.log(`Inserted order_id: ${order_id}`);
                                insertOrderItem(res, order_id, Item, Product_id, Color, Size, Category, Quantity, Price);
                            }
                        });
                    } else {
                        console.log(results[0]);
                        const order_id = results[0].order_id;
                        console.log(`Existing order_id: ${order_id}`);
                        insertOrderItem(res, order_id, Item, Product_id, Color, Size, Category, Quantity, Price);
                    }
                }
            });
        } catch (e) {
            res.status(500).send("Error occurred when creating the data");
        }
    });

    
    router.get("/cart", (req, res) => {
        try {
            const Customer = verify(req);
            if (Customer === false) {
                res.status(400).json({ error: "INVALID_USER" });
                return;
            }
            const sql = `SELECT  order_item.Product_id, order_item.Color, order_item.Size, order_item.Item, order_item.Quantity, order_item.Price  
            FROM order_item
            `;
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

    router.delete("/cart", async (req, res) => {
        const Customer = verify(req);
        if (Customer === false || !req.query.Product_id) {
            res.status(400).json({ error: "INVALID_PARAMS" });
            return;
        }
        try {
            const sql = `DELETE FROM order_item WHERE Product_id = ?`;
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

    router.put("/cart", async (req, res) => {
        const Customer = verify(req);
        if (Customer === false) {
            res.status(400).json({ error: "INVALID_USER" });
            return;
        }
        try {
            const { Product_id, Color, Size, Quantity } = req.body;
            const exist = await checkCartDuplicate( Product_id);
            if (exist === false) return res.status(400).json({ error: "PRODUCT NOT EXIST" });
            const sql = `UPDATE order_item SET Color = ?, Size = ? Quantity = ? WHERE Product_id = ?`;
            connection.query(sql, [Product_id, Color, Size, Quantity], (error, data) => {
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

    router.get("/cart/color", async (req, res) => {
        try {
            let sqlCommand = `SELECT * FROM order_item where Product_id = ${req.query.Product_id}`;
            connection.query(sqlCommand, (err, colors) => {
                if (err) return res.status(500).send("error occurred when searching the data");
                return res.json(colors.map((item) => item.Color));
            });
        } catch (e) {
            console.error({ error });
            return res.status(500).send("error occurred when searching the data");
        }
    });





};
