const UserService = require('./user.service');
const userResource = require('./user.resource');
const Response = require('../../shared/utils/response');

class UserController {
    async getAll(req, res) {
        try {
            const users = await UserService.getAll();
            const usersData = users.data.map(userResource);
            return Response.success(res, usersData, 'Users fetched successfully'); 
        } catch (err) {
            Response.error(res, err);
        }
    }

    async getUserById(req, res) {
        try {
            const { id } = req.params;

            const user = await UserService.getById(id);

            if (!user.data) {
                throw new Error("User not found");
            }

            const userData = userResource(user.data);

            return Response.success(res, userData, 'User fetched successfully');
        } catch (err) {
            Response.error(res, err);
        }
    }

    async saveUser(req, res) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                throw new Error("Request body cannot be empty");
            }
            let user = await UserService.createUser(req.body);

            return Response.success(res, userResource(user.data), 'User saved successfully', 201);

        } catch (err) {
            Response.error(res, err, 401);
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;

            if(!id){
                throw new Error("User Id is required");
            }
            if (!req.body || Object.keys(req.body).length === 0) {
                throw new Error("Request body cannot be empty");
            }

            let user = await UserService.updateUser(id, req.body);
            
            return Response.success(res, userResource(user.data), 'User updated successfully');
        }catch (err) {
            Response.error(res, err);
        }
    }

    async deleteUser(req, res){
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("User Id is required");
            }

            let user = await UserService.deleteUser(id);

            return Response.success(res, user, 'User deleted successfully');
        } catch (err) {
            Response.error(res, err);
        }
    }
}

module.exports = new UserController();