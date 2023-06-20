const connection = require("../db");
const { verify } = require("../verify");

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
        let sqlCommand = "SELECT * FROM product";
        if (req.query.category) sqlCommand += ` where category = '${req.query.category}'`;
        try {
            const shops = await connection.connectionPromise(sqlCommand);
            res.json(shops);
        } catch (err) {
            res.status(500).send("error occurred when searching the data");
        }
    });

    router.get("/product/getcolor", async (req, res) => {
        try {
          const { Product_id } = req.query;
          console.log(Product_id);
          const sqlCommand = `SELECT Color FROM product_color WHERE Product_id = ?`;
          connection.query(sqlCommand, [Product_id], (err, colors) => {
            if (err) {
              console.error(err);
              return res.status(500).send("Error occurred when searching the data");
            }
            const colorOptions = colors.map((item) => item.Color);
            return res.json(colorOptions);
          });
        } catch (e) {
          console.error(e);
          return res.status(500).send("Error occurred when searching the data");
        }
      });
      
      router.get("/product/getsize", async (req, res) => {
        try {
          const { Product_id } = req.query;
          console.log(Product_id);
          const sqlCommand = `SELECT Size FROM product_size WHERE Product_id = ?`;
          connection.query(sqlCommand, [Product_id], (err, sizes) => {
            if (err) {
              console.error(err);
              return res.status(500).send("Error occurred when searching the data");
            }
            const sizeOptions = sizes.map((item) => item.Size);
            return res.json(sizeOptions);
          });
        } catch (e) {
          console.error(e);
          return res.status(500).send("Error occurred when searching the data");
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

    router.get("/username", (req, res) => {
        try {
            const Customer = verify(req);
            if (Customer === false) {
                res.status(400).json({ error: "INVALID_USER" });
                return;
            }
            
            const sql = `SELECT Username, Joined_since 
                         FROM customer 
                         WHERE Username = '${Customer}'
                        `;

            connection.query(sql, (error, data) => {
                if (error) {
                    console.error(error); 
                    res.status(500).json({ error });
                } else if (data.length === 0) {
                    res.status(404).json({ error: "USER_NOT_FOUND" });
                } else {
                    const userData = {
                        username: data[0].Username,
                        joined_since: data[0].Joined_since
                    };
                    res.json(userData);
                }
            });
        } catch (e) {
          console.error(e); 
          res.status(500).send(" Error occurred when getting the data");
        }
      });



    
};
