import Submission from "../models/submissionModel.js"

export const createSubmission = async(submission) => {
    try{
        const response = await Submission.create(submission);
        return response;
    } catch(err) {
        return err;
    }
}

export const updateSubmission = async(status,id) => {
    try{
        console.log("id is",id);
        console.log("status is", status);
        
        const submission = await Submission.findByIdAndUpdate(id,{status: status},{new: true});
        console.log("new submission is", submission);
        return submission;
    } catch(err){
        return err;
    }
}

export const getSubmissions = async(userId, problemId) => {
    try{
        const submissions = await Submission.find({userId: userId, problemId: problemId});
        return submissions;
    } catch(error) {
        return err;
    }
}
