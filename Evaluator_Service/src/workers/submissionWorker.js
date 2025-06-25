import { Worker } from "bullmq";
import redisConnection from "../config/redisConfig.js";
import SubmissionJob from "../jobs/submissionJob.js";

export default function SubmissionWorker(queueName) {
    const worker = new Worker(
        queueName, 
        async (job) => {
            console.log("submission woker kicking");
            if(job.name == 'SubmissionJob') {

                const submissionJobInstance = new SubmissionJob(job.data);
                submissionJobInstance.handle(job);
                return true;

            }
        },
        {
            connection: redisConnection
        }
    );
}