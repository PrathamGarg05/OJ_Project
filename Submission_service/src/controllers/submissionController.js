import * as submissionService from '../services/submissionService.js'
import {StatusCodes} from 'http-status-codes'
import { successResponse } from '../utils/Response.js';

export const pingCheck = async(req,res) => {
    const response = await submissionService.pingCheck(req,res);
    return res.send({data: response});
}

export const createSubmission = async(req,res) => {
    const response = await submissionService.addSubmission(req.body);
    return successResponse(response, StatusCodes.CREATED, "Created Submission", res);
}

export const getSubmissions = async(req, res) => {
    const {userId, problemId} = req.params;
    const response = await submissionService.getSubmissions(
        userId, problemId
    );
    return successResponse(response, StatusCodes.OK, "Fetched Submissions", res);
}

export const runProblem = async(req,res) => {
    const response = await submissionService.runProblem(req.body);
    return successResponse(response, StatusCodes.CREATED, "Running Code", res);
}

export const getUserStats = async(req,res) => {
    const {userId} = req.params;
    const response = await submissionService.getUserStats(userId);
    console.log(response);
    return successResponse(response, StatusCodes.OK, "Fetched Stats", res);
}