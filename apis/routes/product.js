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
        let sqlCommand = "SELECT * FROM product";
        if (req.query.category) sqlCommand += ` where category = '${req.query.category}'`;
        try {
            const shops = await connection.connectionPromise(sqlCommand);
            res.json(shops);
        } catch (err) {
            res.status(500).send("error occurred when searching the data");
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
          const sql = `SELECT Username, Joined_since FROM customer WHERE Username = 'wu4shan'`;
      
          connection.query(sql, (error, data) => {
            if (error) {
              console.error(error); // 在控制台印出錯誤訊息
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
          console.error(e); // 在控制台印出錯誤訊息
          res.status(500).send(" 在控制台印出錯誤訊息 Error occurred when getting the data");
        }
      });
      
      
      



    
};
