import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/serverConfig.js';

export const generateToken = (user) => {
    return jwt.sign(
        {id: user._id.toString(), email: user.email, role: user.role},    //payload
        JWT_SECRET,                                      //secret key
        {expiresIn: '1h'}
    );
};