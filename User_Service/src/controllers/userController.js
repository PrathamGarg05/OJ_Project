import { StatusCodes } from 'http-status-codes';
import * as UserService from '../services/UserService.js';
import { errorResponse, successResponse } from '../utils/Response.js';

export const registerUser = async (req,res) => {
    try{
        const response = await UserService.register({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        return successResponse(response, StatusCodes.CREATED, "User registered successfully", res);
    } catch(error){
        return errorResponse(error, res);
    }
};

export const login = async(req, res) => {
    try{
        const {token, user} = await UserService.login({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        res.cookie("token", token, {
            maxAge: 1000*60*60,
            httpOnly: true,
        });
        return successResponse(
            { user : { id: user._id, email: user.email,username:user.username}},
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
            {user : {id: user._id, username: user.username, email: user.email}},
            StatusCodes.OK,
            "Successfully fetched user details",
            res);
    } catch(error){
        errorResponse(error,res);
    }
};