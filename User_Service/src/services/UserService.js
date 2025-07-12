import { StatusCodes} from 'http-status-codes';
import * as UserRepo from '../repositories/UserRepo.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwtUtils.js';
import { sendVerificationEmail } from '../utils/emailUtils.js';

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
    const user = await UserRepo.register({username, email, password, role, isVerified: false});
    const verificationToken = generateToken(user);
    user.verificationToken = verificationToken;
    await user.save();
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    const emailResponse = await sendVerificationEmail(email, verificationLink);
    console.log(emailResponse);
    return {
        message: "User registered successfully",
        status: StatusCodes.CREATED
    };
};

export const login = async ({ email, password}) => {
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
    if(!user.isVerified){
        throw{
            message: "Email not verified",
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

export const useHint = async(id) => {
    try{
        const user = await UserRepo.findUserById(id);
        const today = new Date().toISOString().split('T')[0];
        if(!user){
            throw{
                message: "User not found",
                status: StatusCodes.NOT_FOUND
            };
        }
        if(user.hintUsage.lastUsed != today) {
            user.hintUsage = { count: 1, lastUsed: today };
        } else if (user.hintUsage.count < 3) {
            user.hintUsage.count += 1;
        } else {
            throw{
                message: "Daily hint limit reached",
                status: StatusCodes.TOO_MANY_REQUESTS
            };
        }
        await user.save();
        return {
            message: "Hint used successfully",
            status: StatusCodes.OK
        };
    }catch(error){
        throw error;
    }
};

export const verifyEmail = async(token) => {
    try{
        const user = await UserRepo.findUserByVerificationToken(token);
        if(!user){
            throw{
                message: "Invalid verification token",
                status: StatusCodes.BAD_REQUEST
            };
        }
        if(user.isVerified){
            throw{
                message: "Email already verified",
                status: StatusCodes.BAD_REQUEST
            };
        }
        user.isVerified = true;
        user.verificationToken = null;
        await user.save();
        return {
                message: "Email verified successfully",
                status: StatusCodes.OK
        };
    }catch(error){
        throw error;
    }
};