import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
    title : {
        type: String,
        required: [true, 'Title cannot be empty'],
        unique: true
     },
     description: {
        type: String,
        required: [true, 'Description cannot be empty']
     },
     difficulty: {
        type: String,
        required: [true, 'Difficulty cannot be empty'],
        enum : [`easy`, `medium`, `difficulty`],
        default: 'easy'
     },
     constraints: {
        type: String
     },
     sampleInput: {
        type: String,
        required: true
     },
     sampleOutput: {
        type: String,
        required: true
     }
});

export const Problem = mongoose.model('Problem', ProblemSchema);