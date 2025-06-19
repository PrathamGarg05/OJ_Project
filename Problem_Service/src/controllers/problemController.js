import * as ProblemService from '../services/problemService.js';
import { errorResponse, successResponse } from '../utils/Response.js';
import { StatusCodes } from "http-status-codes";

export const getProblems = async(req,res) => {
    try{
        const response = await ProblemService.getProblems();
        return successResponse(response, StatusCodes.OK, 'Problems Fetched', res);
    } catch (error){
        return errorResponse(error, res);
    }
};