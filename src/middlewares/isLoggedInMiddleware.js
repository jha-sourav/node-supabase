const jwt = require('jsonwebtoken');

function isLoggedInMiddleware (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return next();
    }
    
    try{
        jwt.verify(token, process.env.JWT_SECRET);

        return res.status(400).json({ error: "User already logged in" });

    }catch (err) {
        next();
    }
}

module.exports = isLoggedInMiddleware;