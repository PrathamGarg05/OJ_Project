import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "UserId is missing"]
    },
    problemId: {
        type: String,
        required: [true, "ProblemId is missing"]
    },
    code: {
        type: String,
        required: [true, "Code is missing"]
    },
    language: {
        type: String,
        required: [true, "Language is missing"]
    },
    status: {
        type: String,
        enum: ["Pending", "Success", "TLE", "MLE", "WA"],
        default: "Pending"
    }
});

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;