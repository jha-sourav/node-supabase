const AuthService = require('./auth.service');
const userResource = require('../users/user.resource');
const Response = require('../../shared/utils/response');

class AuthController {
    async register(req, res) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                throw new Error("Request body cannot be empty");
            }
            const user = await AuthService.register(req.body);
            
            return Response.success(res, userResource(user.data), 'User registered successfully', 201);
        } catch (err) {
            Response.error(res, err);
        }
    }

    async login(req, res) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                throw new Error("Request body cannot be empty");
            }
            const user = await AuthService.login(req.body);
            user.user = userResource(user.user);
            return Response.success(res, user, 'User Login successfully');
        }catch (err) {
            Response.error(res, err, 401);
        }
    }
}

module.exports = new AuthController();