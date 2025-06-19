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