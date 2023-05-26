const jwt = require("jsonwebtoken");

const verify = (req) => {
    if (!req?.headers?.authorization) return false;
    try {
        const username = jwt.verify(req.headers.authorization, process.env.JWT_KEY)["username"];
        return username;
    } catch (err) {
        return false;
    }
};

module.exports = { verify };
