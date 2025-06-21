import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const authenticateToken = (JWT_SECRET) => (req,res,next) => {
    // const token = req.headers.authorization?.split(' ')[1];

    const token = req.cookies.token;

    //if no token given
    if(!token){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Access token required"
        });
    }
    try{
        console.log(token);
        const decoded = jwt.verify(token, JWT_SECRET);   
        req.user = decoded;   
        next();
    } catch(error){
        console.log(error);
        return res.status(StatusCodes.FORBIDDEN).json({
            message : "Invalid or expired token"
        });
    }
};

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