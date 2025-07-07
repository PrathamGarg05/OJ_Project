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