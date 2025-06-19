import {StatusCodes} from 'http-status-codes';

export const roleAuthorization = (...roles) => (req,res,next) => {
    if(roles.includes(req.user.role)) {
        next();
    }else{
        return res.status(StatusCodes.FORBIDDEN).json({
            message: "You are not authorized for this action",
            success: false
        });
    }
};