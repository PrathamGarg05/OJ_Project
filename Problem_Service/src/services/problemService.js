
import * as ProblemRepo from '../repositories/problemRepo.js';

export const getProblems = async() => {
    const problems = await ProblemRepo.getProblems();
    
    return problems;
};