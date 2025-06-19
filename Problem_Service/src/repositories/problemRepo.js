import { StatusCodes } from "http-status-codes";
import { Problem } from "../models/Problem.js";

export const createProblem = async(problemData) => {
    try{
        const problem = await Problem.create({
            title: problemData.title,
            description: problemData.description,
            difficulty: problemData.difficulty,
            constraints: (problemData.constraints) ? problemData.constraints : "",
            sampleInput: problemData.sampleInput,
            sampleOutput: problemData.sampleOutput
        });
        return problem;
    } catch(error){
        throw error;
    }
};

export const getProblems = async() => {
    try{
        const problems = await Problem.find({});
        return problems;
    } catch(error){
        throw error;
    }
};

export const getProblemById = async(problemId) => {
    try{
        const problem = await Problem.findById(problemId);
        if(!problem){
            throw {
                message: "Problem doesn't exist",
                status: StatusCodes.BAD_REQUEST
            };
        }
        return problem;
    } catch(error){
        throw error;
    }
};

export const updateProblem = async(problemId, newData) => {
    try{
        const problem = await Problem.findByIdAndUpdate(
            problemId,
            newData,
            {new: true}
        );
        if(!problem){
            throw {
                message: "Problem doesn't exist",
                status: StatusCodes.BAD_REQUEST
            };
        }
        return problem;
    } catch(error){
        throw error;
    }
};

export const deleteProblem = async(problemId) => {
    try{
        const problem = await Problem.findByIdAndDelete(problemId);
        if(!problem){
            throw {
                message: "Problem doesn't exist",
                status: StatusCodes.BAD_REQUEST
            };
        }
        return problem;
    } catch(error){
        throw error;
    }
};