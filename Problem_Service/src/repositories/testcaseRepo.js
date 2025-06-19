import { StatusCodes } from "http-status-codes";
import { Testcase } from "../models/Testcase.js";
import { getProblemById } from "./problemRepo.js";

export const addTestcase = async(problemId,tcData) => {
    try{
        const problem = await getProblemById(problemId);
        const testcase = await Testcase.create({
            problem: problemId,
            input: tcData.input,
            output: tcData.output,
            isSample: tcData.isSample
        });
        return testcase;
    } catch(error) {
        throw error;
    }
};

export const getAllTestcase = async(problemId) => {
    try{
        const problem = await getProblemById(problemId);
        const testcases = await Testcase.find({
            problem: problemId
        });
        return testcases;
    } catch(error) {
        throw error;
    }
};

export const updateTestcase = async(tcId, newTC) => {
    try{
        const testcase = await Testcase.findByIdAndUpdate(
            tcId,
            newTC,
            {new: true}
        );
        if(!testcase){
            throw {
                message: "testcase doesn't exist",
                status: StatusCodes.BAD_REQUEST
            };
        }
        return testcase;
    } catch(error){
        throw error;
    }
};

export const deleteTestcase = async(tcId) => {
    try{
        const testcase = await Testcase.findByIdAndDelete(
            tcId,
        );
        if(!testcase){
            throw {
                message: "testcase doesn't exist",
                status: StatusCodes.BAD_REQUEST
            };
        }
        return testcase;
    } catch(error){
        throw error;
    }
};