import { StatusCodes } from "http-status-codes";
import * as aiService from "../services/aiService.js";
import { errorResponse, successResponse } from "../utils/Response.js";
export const getHint = async(req,res) => {
    try{
        const hint = await aiService.getHint(req.params.id, req.user.id);
        return successResponse(hint, StatusCodes.OK, "Hint fetched successfully", res);
    } catch(error){
        return errorResponse(error, res);
    }
};

export const getBoilerplate = async(req,res) => {
    try{
        const boilerplate = await aiService.getBoilerplate(req.params.id, req.params.language);
        return successResponse(boilerplate, StatusCodes.OK, "Boilerplate fetched successfully", res);
    } catch(error){
        return errorResponse(error, res);
    }
};

export const getAiReview = async(req, res) => {
    try{
        const aiReview = await aiService.getAiReview(req.params.id, req.body.code);
        return successResponse(aiReview, StatusCodes.OK, "AI Review fetched successfully", res);
    } catch(error){
        return errorResponse(error, res);
    }
};