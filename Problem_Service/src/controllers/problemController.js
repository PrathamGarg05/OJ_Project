import * as ProblemService from '../services/problemService.js';
import { errorResponse, successResponse } from '../utils/Response.js';
import { StatusCodes } from "http-status-codes";

export const createProblem = async(req,res) => {
    try{
        const response = await ProblemService.createProblem(req.body);
        return successResponse(response, StatusCodes.CREATED, "Problem created successfully", res);
    } catch (error){
        return errorResponse(error, res);
    }
};

export const getProblems = async(req,res) => {
    try{
        const response = await ProblemService.getProblems();
        return successResponse(response, StatusCodes.OK, 'Problems Fetched', res);
    } catch (error){
        return errorResponse(error, res);
    }
};

export const getProblem = async (req, res) => {
    try{
        const response = await ProblemService.getProblem(req.params.id);
        return successResponse(response, StatusCodes.OK, 'Problem fetched', res); 
    } catch(error) {
        return errorResponse(error, res);
    }
};

export const updateProblem = async(req,res) => {
    try{
        const response = await ProblemService.updateProblem(
            req.params.id, 
            req.body
        );
        return successResponse(response, StatusCodes.OK, "Problem updated", res);
    } catch(error){
        return errorResponse(error,res);
    }
};

export const deleteProblem = async(req,res) => {
    try{
        const response = await ProblemService.deleteProblem(req.params.id);
        return successResponse(response, StatusCodes.OK, "Problem deleted", res);
    } catch(error){
        return errorResponse(error, res);
    }
};

