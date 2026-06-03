const UserRepository = require('./user.repository');
const { createUserSchema } = require('./user.validation');
const { formatZodError, hashPassword } = require('../../shared/utils/helpers');

class UserService {
    async getAll(){
        const users = await UserRepository.findAll();

        return users;
    }

    async getById(id){
        const user = await UserRepository.findById(id);
        return user;
    }

    async createUser(data) {
        const result = createUserSchema.safeParse(data);

        if(!result.success){
            const error = new Error('Validation failed');
            error.errors = formatZodError(result.error);
            throw error;
        }

        const {name, email, password} = data;
        const exsisting = await UserRepository.findByEmail(email);

        if(exsisting.data){
            throw new Error('User already exists');
        }

        const hashedPassword = await hashPassword(password);

        const user = await UserRepository.create({
            name, email, password: hashedPassword
        });
        
        return user;
    }

    async updateUser(id, data){
        const exsisting = await UserRepository.findById(id);

        if(!exsisting.data){
            throw new Error('User not found.');
        }

        const updateData = {}

        if(data.name){
            updateData.name = data.name;
        }

        if(data.email) {
            const emailUser = await UserRepository.findByEmail(data.email);
            
            if(emailUser.data && emailUser.data.id !== id){
                throw new Error('Email already exists');
            }
            updateData.email = data.email;
        }

        if(data.password){
            updateData.password =  await hashPassword(data.password);
        }

        const user = await UserRepository.update(id, updateData);
        return user;
    }

    async deleteUser (id) {
        const user = await UserRepository.findById(id);
        if(!user.success){
            throw new Error('User not found');
        }

        if (!user) {
            throw new Error('User not found');
        }

        await UserRepository.delete(id);

        return true;
    }
}

module.exports = new UserService();