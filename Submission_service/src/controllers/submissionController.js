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