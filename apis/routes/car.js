const connection = require("../db");
const { verify } = require("../verify");

// const checkWishProductDuplicate = async (Customer, Product_id) => {
//     const sqlCommand = `SELECT * FROM wish_product WHERE Customer = ${Customer} AND Product_id = ${Product_id}`;
//     try {
//         const result = await connection.connectionPromise(sqlCommand);
//         return result.length !== 0;
//     } catch (err) {
//         console.error(err);
//         throw "SELECT_WISH_ERROR";
//     }
// };

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
            const sql = `SELECT wish_product.Product_id, wish_product.Color, wish_product.Size, product.Product_name,product.Category,  Price, Image FROM wish_product 
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
            //const exist = await checkWishProductDuplicate(Customer, Product_id);
           // if (exist === true) return res.status(400).json({ error: "PRODUCT ALREADY IN WISH CAR" });
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
           // const exist = await checkWishProductDuplicate(Customer, Product_id);
           // if (exist === false) return res.status(400).json({ error: "PRODUCT NOT EXIST" });
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
                        const order_id = results[0].order_id;
                        console.log(`Existing order_id: ${order_id}`);
                        insertOrderItem(res, order_id, Item, Product_id, Color, Size, Category, Quantity, Price);

                        const updateTotalPriceQuery = `UPDATE orderlist SET total_price = (
                            SELECT SUM(price)
                            FROM order_item
                            WHERE order_item.order_id = '${order_id}'
                        )
                        WHERE order_id = '${order_id}'
                        `;

                        connection.query(updateTotalPriceQuery, (error, data) => {
                        if (error) {
                            console.log(error);
                            res.status(500).json({ error });
                        } else {
                            res.json(data);
                        }
                        });
                    }
                }
            });
        } catch (e) {
            res.status(500).send("Error occurred when creating the data");
        }
    });

    
    // router.get("/cart", (req, res) => {
    //     try {
    //         const Customer = verify(req);
    //         if (Customer === false) {
    //             res.status(400).json({ error: "INVALID_USER" });
    //             return;
    //         }
    //         const sql = `SELECT  order_item.Product_id, order_item.Color, order_item.Size, order_item.Item, order_item.Quantity, order_item.Price  
    //         FROM order_item
    //         `;
    //         connection.query(sql, (error, data) => {
    //             if (error) {
    //                 res.status(500).json({ error });
    //             } else {
    //                 res.json(data);
    //             }
    //         });
    //     } catch (e) {
    //         res.status(500).send("error occurred when getting the data");
    //     }
    // });

    router.get("/cart", (req, res) => {
        try {
          const Customer = verify(req);
          if (Customer === false) {
            res.status(400).json({ error: "INVALID_USER" });
            return;
          }
      
          // 直接使用指定 Customer 的 order_id
          const getOrderQuery = `
            SELECT order_id
            FROM orderlist 
            WHERE Customer = '${Customer}'
            LIMIT 1
          `;
      
          connection.query(getOrderQuery, (error, results) => {
            if (error) {
              res.status(500).json({ error });
            } else if (results.length === 0) {
                alert("oder not found");
            //   res.status(404).json({ error: "Order not found" });
            } else {
              const order_id = results[0].order_id;
      
              // 在 order_item 表格中查詢指定的訂單項目記錄
              const sql = `
                SELECT order_item.Product_id, order_item.Color, order_item.Size, order_item.Item, order_item.Quantity, order_item.Price, order_item.Category
                FROM order_item
                WHERE order_item.order_id = '${order_id}'
              `;
      
              connection.query(sql, (error, data) => {
                if (error) {
                  res.status(500).json({ error });
                } else {
                  res.json(data);
                }
              });
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
            const sql = `DELETE FROM order_item WHERE Product_id = ? `;
            connection.query(sql, [req.query.Product_id], (error, data) => {
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
            const { Product_id, Color, Size,  } = req.body;
            const exist = await checkCartDuplicate( Product_id);
            if (exist === false) return res.status(400).json({ error: "PRODUCT NOT EXIST" });
            const sql = `UPDATE order_item SET Color = ?, Size = ?  WHERE Product_id = ?`;
            connection.query(sql, [Product_id, Color, Size], (error, data) => {
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

    router.get("/cart/size", async (req, res) => {
        try {
            let sqlCommand = `SELECT * FROM order_item where Product_id = ${req.query.Product_id}`;
            connection.query(sqlCommand, (err, colors) => {
                if (err) return res.status(500).send("error occurred when searching the data");
                return res.json(colors.map((item) => item.Size));
            });
        } catch (e) {
            console.error({ error });
            return res.status(500).send("error occurred when searching the data");
        }
    });
      
    router.post("/product_purchased", (req, res) => {
        if (!req.body.length) {
          res.status(400).json({ error: "INVALID_PARAMS" });
          return;
        }
      
        try {
          const insertPromises = req.body.map((item) => {
            const { customer, product_id, color, size, purchase_date, category } = item;
            const sql = `INSERT INTO product_purchased (Customer, Product_id, Color, Size, Purchase_date, Category) VALUES (?, ?, ?, ?, ?, ?)`;
            return new Promise((resolve, reject) => {
              connection.query(sql, [customer, product_id, color, size, purchase_date, category], (error, data) => {
                if (error) {
                  console.log(error);
                  reject(error);
                } else {
                  resolve(data);
                }
              });
            });
          });
      
          Promise.all(insertPromises)
            .then(() => {
              // Delete from order_item
              const deleteOrderItemQuery = `
                DELETE FROM order_item 
                WHERE order_id IN (SELECT order_id FROM orderlist WHERE customer = ?)
              `;
              const customer = req.body[0].customer; // Assuming all items have the same customer value
      
              connection.query(deleteOrderItemQuery, [customer], (error, data) => {
                if (error) {
                  console.log(error);
                  res.status(500).json({ error });
                } else {
                  // Delete from orderlist
                  const deleteOrderListQuery = `DELETE FROM orderlist WHERE customer = ?`;
                  connection.query(deleteOrderListQuery, [customer], (error, data) => {
                    if (error) {
                      console.log(error);
                      res.status(500).json({ error });
                    } else {
                      res.json({ message: "Products purchased successfully" });
                    }
                  });
                }
              });
            })
            .catch((error) => {
              res.status(500).json({ error });
            });
        } catch (e) {
          res.status(500).send("Error occurred while purchasing the products");
        }
      });
     
      router.post("/putcart", async (req, res) => {
        const Customer = verify(req);
        if (Customer === false) {
          res.status(400).json({ error: "INVALID_USER" });
          return;
        }
        try {
          const {
            Item,
            Product_id,
            Color,
            Size,
            Category,
            Quantity,
            Price
          } = req.body;
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
                connection.query(
                  insertQuery,
                  [order_id, Customer, Price],
                  (error, data) => {
                    if (error) {
                      console.log(error);
                      res.status(500).json({ error });
                    } else {
                      console.log(`Inserted order_id: ${order_id}`);
                      insertOrderItem(
                        res,
                        order_id,
                        Item,
                        Product_id,
                        Color,
                        Size,
                        Category,
                        Quantity,
                        Price
                      );
                    }
                  }
                );
              } else {
                const order_id = results[0].order_id;
                console.log(`Existing order_id: ${order_id}`);
                insertOrderItem(
                  res,
                  order_id,
                  Item,
                  Product_id,
                  Color,
                  Size,
                  Category,
                  Quantity,
                  Price
                );
                const updateTotalPriceQuery = `UPDATE orderlist SET Total_price = (
                    SELECT SUM(price)
                    FROM order_item
                    WHERE order_item.order_id = '${order_id}'
                )
                WHERE order_id = '${order_id}'
                `;

                connection.query(updateTotalPriceQuery, (error, data) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ error });
                } else {
                    res.json(data);
                }
                });
      
                const checkDuplicateQuery = `SELECT * FROM order_item WHERE Product_id = ?`;
                connection.query(checkDuplicateQuery, [Product_id], (error, results) => {
                  if (error) {
                    console.log(error);
                    res.status(500).json({ error });
                  } else {
                    if (results.length > 0) {
                      // Product_id already exists in order_item table
                      return res.status(400).json({ error: "DUPLICATE_PRODUCT" });
                    } else {
                      const insertQuery = `INSERT INTO order_item (Item, Product_id, Color, Size, Category, Quantity, Price) VALUES (?, ?, ?, ?, ?, ?, ?)`;
                      connection.query(
                        insertQuery,
                        [Item, Product_id, Color, Size, Category, Quantity, Price],
                        (error, data) => {
                          if (error) {
                            console.log(error);
                            res.status(500).json({ error });
                          } else {
                            console.log(`Inserted Product_id: ${Product_id}`);

                            const deleteWishProductQuery = `DELETE FROM final.wish_product WHERE Product_id = ?`;
                            connection.query(
                              deleteWishProductQuery,
                              [Product_id],
                              (error, data) => {
                                if (error) {
                                  console.log(error);
                                  res.status(500).json({ error });
                                } else {
                                  console.log(
                                    `Deleted wish_product Product_id: ${Product_id}`
                                  );
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                });
              }
            }
          });
        } catch (e) {
          res.status(500).send("Error occurred when creating the data");
        }
      });
      
    
      

};
