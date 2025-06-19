
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
    const problem = await ProblemRepo.getProblemById(problemId);
    return problem;
};

export const updateProblem = async(problemId, newData) => {
    if(newData.description) newData.description = sanitizeMarkdown(newData.description);
    const problem = await ProblemRepo.updateProblem(problemId, newData);
    return problem;
};