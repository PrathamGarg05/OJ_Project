import * as testcaseRepo from '../repositories/testcaseRepo.js';

export const addTestcase = async(problemId, tcData) => {
    const testcase = await testcaseRepo.addTestcase(problemId, tcData);
    return testcase;
};

export const getAllTestcase = async(problemId) => {
    const testcases= await testcaseRepo.getAllTestcase(problemId);
    return testcases;
};

export const updateTestcase = async(tcId, newTC) => {
    const testcase = await testcaseRepo.updateTestcase(tcId, newTC);
    return testcase;
};

export const deleteTestcase = async(tcId) => {
    const testcase = await testcaseRepo.deleteTestcase(tcId);
    return testcase;
};