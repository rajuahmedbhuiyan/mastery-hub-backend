

const jwt = require('jsonwebtoken');
const error = require('../utils/error');

const authenicate = (req, res, next) => {

    try{
        let token = req.headers.authorization;
        if(!token) {
            throw error("Unauthorized", 401)
        }

        token = token.split(" ")[1];

        if(!token.startsWith("ey")){
            throw error("Unauthorized", 401)
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();


        
    }catch(err){
        return res.status(err.status || 500).json({
            message: err.message,
            status: err.status
        });
    }

}

module.exports = authenicate;