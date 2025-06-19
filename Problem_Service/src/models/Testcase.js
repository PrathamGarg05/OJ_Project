import mongoose from "mongoose";
import { Problem } from "./Problem.js";

const TestcaseSchema = new mongoose.Schema({
    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Problem,
        required: true
    },
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    },
    isSample: {
        type: Boolean,
        required: true
    }
});

export const Testcase = mongoose.model('Testcase', TestcaseSchema);