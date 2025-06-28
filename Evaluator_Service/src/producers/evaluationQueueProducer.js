import evaluationQueue from "../queues/evaluationQueue.js";

export default async function (payload) {

    await evaluationQueue.add("EvaluationJob", payload);

    console.log("Successfully added new evaluationjob");
}