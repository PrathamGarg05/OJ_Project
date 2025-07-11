import { StatusCodes } from 'http-status-codes';
import * as UserService from '../services/UserService.js';
import { errorResponse, successResponse } from '../utils/Response.js';

export const registerUser = async (req,res) => {
    try{
        const response = await UserService.register({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });
        return successResponse(response, StatusCodes.CREATED, "User registered successfully", res);
    } catch(error){
        return errorResponse(error, res);
    }
};

export const login = async(req, res) => {
    try{
        const {token, user} = await UserService.login({
            email: req.body.email,
            password: req.body.password,
        });

        res.cookie("token", token, {
            maxAge: 1000*60*60,
            httpOnly: true,
            sameSite: 'none',
            secure: false
        });
        return successResponse(
            { user : { id: user._id, email: user.email,username:user.username, role: user.role}},
            StatusCodes.OK, 
            "User signed in successfully", 
            res);

    } catch(error){
        errorResponse(error,res);
    }
};

export const myProfile = async(req,res) => {
    try{
        const user = await UserService.myProfile(req.user.email);
        return successResponse(
            {user : {id: user._id, username: user.username, email: user.email, joined: user.createdAt, hintUsage: user.hintUsage}},
            StatusCodes.OK,
            "Successfully fetched user details",
            res);
    } catch(error){
        errorResponse(error,res);
    }
};

export const getAllUsers = async(req,res) => {
    try{
        const users = await UserService.getAllUsers();
        return successResponse(users, StatusCodes.OK, "Fetched all users", res);
    }catch(error){
        return errorResponse(error, res);
    }
};

export const useHint = async(req,res) => {
    try{
        const response = await UserService.useHint(req.params.id);
        return successResponse(response, StatusCodes.OK, "Hint used successfully", res);
    }catch(error){
        return errorResponse(error, res);
    }
};

export const verifyEmail = async(req,res) => {
    try{
        const response = await UserService.verifyEmail(req.body.token);
        return successResponse(response, StatusCodes.OK, "Email verified successfully", res);
    }catch(error){
        return errorResponse(error, res);
    }
};
