import submissionQueueProducer from "../producers/submissionQueueProducer.js";
import * as SubmissionRepo from '../repository/submissionRepo.js'

export const pingCheck = async (req, res) => {
    return res.send({data: "pong"});
}

export const addSubmission = async(submissionData) => {
    const submission = await SubmissionRepo.createSubmission(submissionData);
    if(!submission) {
        throw {message : "Unable to create submission"}
    }

    const response = await submissionQueueProducer(submission);
    return {submission, queueResponse : response};
}

export const getSubmissions = async(userId, problemId) => {
    const submissions = await SubmissionRepo.getSubmissions(userId, problemId);
    return submissions;
}

export const runProblem = async(runData) => {
    const response = await submissionQueueProducer(runData);
    return {queueResponse: response};
}

export const getUserStats = async(userId) => {
    const response = await SubmissionRepo.getUserStats(userId);
    return response;
}