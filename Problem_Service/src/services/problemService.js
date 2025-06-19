
import * as ProblemRepo from '../repositories/problemRepo.js';
import sanitizeMarkdown from '../utils/markdownSanitizer.js';

export const createProblem = async(problemData) => {
    problemData.description = sanitizeMarkdown(problemData.description);
    const problem = await ProblemRepo.createProblem(problemData);
    return problem;  
};

export const getProblems = async() => {
    const problems = await ProblemRepo.getProblems();
    
    return problems;
};

export const getProblem = async(problemId) => {
    try{
        const problem = await ProblemRepo.getProblemById(problemId);
        return problem;
    } catch(error){
        throw error;
    }
};