require("dotenv").config();
module.exports.checkAutorization = (req, res, next) => {
    if(JSON.stringify(req.headers).Authorization !== process.env.AUTHOTRIZATION_KEY.Authorization){
        res.status(403).json({ message: "Not autorize" });
        return
    }
    next();
}