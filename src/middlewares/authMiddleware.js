const jwt = require('jsonwebtoken');
const Response = require('../shared/utils/response');

function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];;

    if(!token){
        return Response.error(res, { message: "No token provided." }, 401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return Response.error(res, { message: "Invalid or expired token." }, 401);
    }
}

module.exports = authMiddleware;