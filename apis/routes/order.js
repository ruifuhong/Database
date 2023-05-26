const connection = require("../db");

module.exports = (router) => {
    router.delete("/record/:productId", (req, res) => {
        const { productId } = req.body;

        try {
            const sql = `DELETE FROM trying WHERE Product_id = ?`;
            const values = productId;

            connection.query(sql, values, (error, results) => {
                if (error) {
                    console.error("刪除記錄時發生錯誤:", error);
                    res.status(500).json({ message: "刪除記錄失敗" });
                } else {
                    res.json({ message: `成功刪除 ID 為 ${productId} 的記錄` });
                }
            });
        } catch (e) {
            return res.status(400).send("error occurred when deleting the data");
        }
    });

    router.patch("/order/:productId", (req, res) => {
        const { productId } = req.body;
        const { quantity } = req.body;

        try {
            const sql = `UPDATE trying SET Quantity = ? WHERE Product_id = ?`;
            const values = [quantity, productId];

            connection.query(sql, values, (error, results) => {
                if (error) {
                    console.error("更新數量時發生錯誤:", error);
                    res.status(500).json({ message: "更新數量失敗" });
                } else {
                    res.json({ message: `成功更新 ID 為 ${productId} 的數量` });
                }
            });
        } catch (e) {
            return res.status(400).send("error occurred when updating the quantity");
        }
    });

    return router;
};
