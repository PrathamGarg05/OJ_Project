import Submission from "../models/submissionModel.js"

export const createSubmission = async(submission) => {
    try{
        const response = await Submission.create(submission);
        return response;
    } catch(err) {
        return err;
    }
}