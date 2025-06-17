import { User } from "../models/User.js";

export const register = async ({username,password,email}) => {
    try{
        const user = await User.create({
            username, password, email
        });
        return user;
    } catch(error){
        throw error;
    }
};

export const findUserByEmail = async (email) => {
    try{
        const user = await User.findOne({email});
        return user;
    }
    catch (error){
        throw error;
    }
};
