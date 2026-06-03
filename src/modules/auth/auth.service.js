const bycrypt = require('bcrypt');
const UserRepository = require('../users/user.repository');
const { createUserSchema, loginSchema } = require('../users/user.validation');
const { formatZodError, hashPassword, generateToken } = require('../../shared/utils/helpers');

class AuthService {
    async register(data) {
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

    async login(data) {
        const result = loginSchema.safeParse(data);

        if(!result.success){
            const error = new Error('Validation failed');
            error.errors = formatZodError(result.error);
            throw error;
        }

        const {email, password} = data;

        const { data: user } = await UserRepository.findByEmail(email);

        if(!user){
            throw new Error("User not found");
        }
        
        const isMatch = await bycrypt.compare(password, user.password);

        if(!isMatch) {
            throw new Error('Invalid Credentials.');
        }

        const token = await generateToken({id: user.id, email:user.email});

        return {  user, token };
    }
}

module.exports = new AuthService();