import { StatusCodes } from 'http-status-codes';
import * as testcaseService from '../services/testcaseService.js';
import { errorResponse, successResponse } from '../utils/Response.js';

export const addTestcase = async (req,res) => {
    try{
        const response = await testcaseService.addTestcase(
            req.params.id,
            req.body
        );
        return successResponse(response, StatusCodes.CREATED, "Added test case", res);
    } catch(error){
        return errorResponse(error, res);
    }
};

export const getAllTestcase = async (req,res) => {
    try{
        const response = await testcaseService.getAllTestcase(
            req.params.id
        );
        return successResponse(response, StatusCodes.OK, "testcases fetched", res);
    } catch(error){
        return errorResponse(error, res);
    }
};

export const updateTestcase = async(req,res) => {
    try{
        const response = await testcaseService.updateTestcase(
            req.params.id,
            req.body
        );
        return successResponse(response, StatusCodes.OK, "testcase updated", res);
    } catch(error) {
        return errorResponse(error, res);
    }
};

export const deleteTestcase = async(req,res) => {
    try{
        const response = await testcaseService.deleteTestcase(
            req.params.id
        );
        return successResponse(response, StatusCodes.OK, "testcase deleted", res);
    } catch(error) {
        return errorResponse(error, res);
    }
};

export const getSampleTestcase = async (req,res) => {
    try{
        const response = await testcaseService.getSampleTestcase(
            req.params.id
        );
        return successResponse(response, StatusCodes.OK, "testcases fetched", res);
    } catch(error){
        return errorResponse(error, res);
    }
};