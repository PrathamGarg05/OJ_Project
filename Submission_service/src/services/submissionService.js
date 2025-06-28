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