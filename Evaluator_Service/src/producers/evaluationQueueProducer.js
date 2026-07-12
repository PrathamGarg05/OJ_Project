import evaluationQueue from "../queues/evaluationQueue.js";

export default async function (payload) {

    await evaluationQueue.add("EvaluationJob", payload, {
        removeOnComplete: true,
        removeOnFail: true
    });

    console.log("Successfully added new evaluationjob");
}