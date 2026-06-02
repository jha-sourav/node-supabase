const AuthService = require('../services/AuthService');

class AuthController {
    async register(req, res) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                throw new Error("Request body cannot be empty");
            }
            const user = await AuthService.register(req.body);
            let status = 201;
            if(!user.success){
                status = 400;
            }
            return res.status(status).json(user);
        } catch (err) {
            res.status(400).json({error: err.message});
        }
    }

    async login(req, res) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                throw new Error("Request body cannot be empty");
            }
            const user = await AuthService.login(req.body);
            let status = 200;
             if(!user.success){
                status = 401;
            }
            return res.status(status).json(user);
        }catch (err) {
            res.status(401).json({error: err.message});
        }
    }
}

module.exports = new AuthController();