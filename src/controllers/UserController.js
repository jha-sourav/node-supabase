const { success } = require('zod');
const UserService = require('../services/UserService');
const userResource = require('../resources/userResource');

class UserController {
    async getAll(req, res) {
        try {
            const users = await UserService.getAll();
            const usersData = users.data.map(userResource);
            return res.status(200).json({ success: true, data: usersData });
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    async getUserById(req, res) {
        try {
            const { id } = req.params;

            const user = await UserService.getById(id);

            if (!user.data) {
                return res.status(400).json({ error: "User not found" });
            }

            const userData = userResource(user.data);

            return res.status(200).json({ sucess: true, data: userData });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async saveUser(req, res) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                throw new Error("Request body cannot be empty");
            }
            let user = await UserService.createUser(req.body);
            let status = 201;
            if (!user.success) {
                status = 400;
            }else{
                user.data = userResource(user.data.data);
            }
            return res.status(status).json(user);

        } catch (err) {
            res.status(401).json({ error: err.message });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;

            if(!id){
                throw new Error('User Id is required');
            }
            if (!req.body || Object.keys(req.body).length === 0) {
                throw new Error("Request body cannot be empty");
            }

            let user = await UserService.updateUser(id, req.body);
            let status = 200;

            if (!user.success) {
                status = 400;
            } else {
                user.data = userResource(user.data.data);
            }

            return res.status(status).json(user);
        }catch (err) {
            res.status(400).json({ success:false , error: err.message });
        }
    }

    async deleteUser(req, res){
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error('User Id is required');
            }

            let user = await UserService.deleteUser(id);
            let status = 200;

            if (!user.success) {
                status = 400;
            }

            return res.status(status).json(user);
        } catch (err) {
            res.status(400).json({ success:false , error: err.message });
        }
    }
}

module.exports = new UserController();