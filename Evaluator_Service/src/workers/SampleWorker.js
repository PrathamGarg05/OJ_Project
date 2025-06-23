import { Worker } from "bullmq";
import SampleJob from "../jobs/SampleJob.js";
import redisConnection from "../config/redisConfig.js";

export default function SampleWorker(queueName) {
    const worker = new Worker(
        queueName, 
        async (job) => {
            console.log("woker kicking");
            if(job.name == 'SampleJob') {

                const sampleJobInstance = new SampleJob(job.data);
                sampleJobInstance.handle(job);
                return true;

            }
        },
        {
            connection: redisConnection
        }
    );
}