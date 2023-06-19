const connection = require("../db");
const { verify } = require("../verify");

module.exports = (router) => {
    router.get("/customer", (req, res) => {
        console.log("進入customer");
        //console.log(req.headers);
        const Customer = verify(req);
        const url_pass = req.headers['x-referer']
        if (Customer === false  )  {
            if(url_pass.startsWith('show_product')){
                
                return
            }
            else{
                res.status(500).json({ error: "你沒有登錄" });
                return

            }
            
        }
        try {
            const sql = `SELECT * FROM final.customer WHERE username = '${Customer}'`;
            connection.query(sql, (error, data) => {
                if (error) {
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
