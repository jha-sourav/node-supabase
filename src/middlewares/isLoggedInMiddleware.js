const jwt = require('jsonwebtoken');
const Response = require('../shared/utils/response');

function isLoggedInMiddleware (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return next();
    }
    
    try{
        jwt.verify(token, process.env.JWT_SECRET);

        return  Response.error(res, { message: "User already logged in" });

    }catch (err) {
        next();
    }
}

module.exports = isLoggedInMiddleware;