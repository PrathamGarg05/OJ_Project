import {Worker} from 'bullmq';

import redisConnection from "../config/redisConfig.js";

import axios from 'axios';
import { updateSubmission } from '../repository/submissionRepo.js';
import { SOCKET_SERVICE } from '../config/serverConfig.js';

export default function EvaluationWorker(queueName = "EvaluationQueue") {
    const worker = new Worker(
        queueName, 
        async (job) => {
            console.log("eval worker kicking");
            const res = await updateSubmission(job.data.verdict, job.data.submissionId);
            if(job.name == 'EvaluationJob') { 
                await axios.post(`${SOCKET_SERVICE}/sendPayload`, {
                    userId: job.data.userId,
                    payload: job.data
                })
            }
        },
        {
            connection: redisConnection
        }
    );
}