
const { verify } = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            let user = verify(token, process.env.SECRET_KEY)
            console.log(user);
            req.id = user?.id;
            next();
        } else {
            return res.status(401).send("Unauthorized");
        }
    } catch (error) {
        res.status(401).send("Unauthorized");
    }
};
module.exports = auth;