import { StatusCodes} from 'http-status-codes';
import * as UserRepo from '../repositories/UserRepo.js';

export const register = async ({username, email, password}) => {
    const existingUser = await UserRepo.findUserByEmail(email);
    if(existingUser){
        throw{
            message: "Email already is use",
            status: StatusCodes.BAD_REQUEST
        };
    }
    const user = await UserRepo.register({username, email, password});
    return user;
};