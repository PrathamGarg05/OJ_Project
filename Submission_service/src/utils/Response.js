import { StatusCodes } from "http-status-codes";

export const successResponse = (response, status, message , res) => {
    return res.status(status).send({
        success : true,
        data : response,
        message : message
    });
};

export const errorResponse = (error, res) => {
    console.log(error);
    if(error.status){
        return res.status(error.status).send({
            message : error.message, 
            success: false
        });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message : "server error",
        success : false
    });
};