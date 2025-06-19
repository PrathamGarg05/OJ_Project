import { StatusCodes} from 'http-status-codes';
import * as UserRepo from '../repositories/UserRepo.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwtUtils.js';

export const register = async ({username, email, password, role}) => {
    if(await UserRepo.findUserByUsername(username)){
        throw{
            message: "Username taken",
            status: StatusCodes.BAD_REQUEST
        };
    }
    const existingUser = await UserRepo.findUserByEmail(email);
    if(existingUser){
        throw{
            message: "Email already is use",
            status: StatusCodes.BAD_REQUEST
        };
    }
    const user = await UserRepo.register({username, email, password, role});
    return user;
};

export const login = async ({username, email, password}) => {
    const user = await UserRepo.findUserByEmail(email);
    if(!user){
        throw{
            message: "Invalid Email or Password",
            status: StatusCodes.BAD_REQUEST
        };
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        throw {
            message: "Invalid Email or Password",
            status: StatusCodes.BAD_REQUEST
        };
    }

    //is password is valid -> generate a token for user
    const token = generateToken(user);

    // attach the token with user
    return{
        token, 
        user : {id:user._id, email: user.email, username: user.username, role: user.role}
    };
};

export const myProfile = async(email) => {
    const user = await UserRepo.findUserByEmail(email);
    return user;
};

export const getAllUsers = async() => {
    const users = await UserRepo.getAllUsers();
    return users;
};