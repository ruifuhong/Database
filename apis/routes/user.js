const connection = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = (router) => {
    router.get("/user/:userId", (req, res) => {
        try {
            const userId = req.params.userId;

            connection.query("SELECT * FROM final.customer WHERE Username = ?", [userId], (err, results) => {
                if (err) {
                    console.log("userId,err", userId);
                    console.error("從數據庫獲取用戶信息時發生錯誤:", err);
                    return res.status(500).send("從數據庫獲取用戶信息時發生錯誤");
                }

                if (!Array.isArray(results) || results.length === 0) {
                    console.log("userId,results.length", userId);
                    return res.status(404).send("用戶不存在");
                }

                const user = results[0];

                return res.render("member", { userId, user });
            });
        } catch (e) {
            console.error("從數據庫獲取用戶信息時發生錯誤:", e);
            return res.status(500).send("從數據庫獲取用戶信息時發生錯誤");
        }
    });

    router.post("/signin", (req, res) => {
        const { username, password } = req.body;
        const sql = "SELECT * FROM customer WHERE Username = ?";
        connection.query(sql, username, (err, user) => {
            if (!Array.isArray(user) || user.length !== 1)
                return res.status(400).json({ error: "USERNAME_PASSWORD_INCORRECT" });
            if (!bcrypt.compareSync(password, user[0].Password))
                return res.status(400).json({ error: "USERNAME_PASSWORD_INCORRECT" });
            return res.json({ token: jwt.sign({ username }, process.env.JWT_KEY) });
        });
    });

    router.post("/signup", async (req, res) => {
        const { username, lastName, firstName, address, password, confirmPassword } = req.body;
        try {
            if (password !== confirmPassword) return res.status(400).json({ err: "PASSWORD_CONFIRM_NOT_SAME" });

            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) return res.status(500).json({ error: "REGIST_FAILED" });
                const sql =
                    "INSERT INTO final.customer (username, password, First_name, Last_name, Joined_since , address) VALUES (?, ?, ?, ?, NOW(), ?)";
                const values = [username, hashedPassword, firstName, lastName, address];

                connection.query(sql, values, (error, results) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({ error: "REGIST_FAILED" });
                    } else {
                        res.json({ msg: "ok" });
                    }
                });
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "REGIST_FAILED" });
        }
    });
};
