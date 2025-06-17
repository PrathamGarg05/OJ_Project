import { StatusCodes } from "http-status-codes";

export const successResponse = (response, status, message , res) => {
    return res.status(status).json({
        success : true,
        data : response,
        message : message
    });
};

export const errorResponse = (error, res) => {
    console.log(error);
    if(error.status){
        return res.status(error.status).json({
            message : error.message, 
            success: false
        });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message : "server error",
        success : false
    });
};