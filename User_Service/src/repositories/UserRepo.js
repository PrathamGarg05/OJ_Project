import { User } from "../models/User.js";

export const register = async ({username,password,email,role}) => {
    try{
        const user = await User.create({
            username, password, email, role
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

export const findUserByUsername = async (username) => {
    try{
        const user = await User.findOne({username});
        return user;
    }
    catch (error){
        throw error;
    }
};

export const getAllUsers = async() => {
    try{
        const users = await User.find({}, {username: 1, email: 1, role: 1});
        return users;
    } catch(error){
        throw error;
    }
};

export const findUserById = async(id) => {
    try{
        const user = await User.findById(id);
        return user;
    }
    catch(error){
        throw error;
    }
};