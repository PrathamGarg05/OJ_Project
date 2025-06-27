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
