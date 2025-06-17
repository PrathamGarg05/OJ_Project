import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/serverConfig.js';

export const authenticateToken = (req,res,next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    //if no token given
    if(!token){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Access token required"
        });
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET);   
        req.user = decoded;   
        next();
    } catch(error){
        return res.status(StatusCodes.FORBIDDEN).json({
            message : "Invalid or expired token"
        });
    }
};