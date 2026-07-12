import submissionQueue from "../queues/submissionQueue.js";

export default async function (payload) {

    await submissionQueue.add("SubmissionJob", payload, {
        removeOnComplete: true,
        removeOnFail: true
    });

    console.log("Successfully added new submissionjob");
}