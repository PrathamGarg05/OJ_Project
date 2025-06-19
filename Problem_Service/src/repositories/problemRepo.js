import { StatusCodes } from "http-status-codes";
import { Problem } from "../models/Problem.js";

export const getProblems = async() => {
    try{
        const problems = await Problem.find({});
        return problems;
    } catch(error){
        throw error;
    }
};