import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "UserId is missing"],
        index: true
    },
    problemId: {
        type: String,
        required: [true, "ProblemId is missing"],
        index: true
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
        enum: ["Pending", "AC", "TLE", "MLE", "WA","RE", "CE"],
        default: "Pending"
    }
}, {timestamps: true});

submissionSchema.index({userId: 1, problemId: 1});

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;