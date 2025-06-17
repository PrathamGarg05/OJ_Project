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