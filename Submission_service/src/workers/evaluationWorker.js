import {Worker} from 'bullmq';

import redisConnection from "../config/redisConfig.js";

import axios from 'axios';

export default function EvaluationWorker(queueName = "EvaluationQueue") {
    const worker = new Worker(
        queueName, 
        async (job) => {
            console.log("eval worker kicking");
            if(job.name == 'EvaluationJob') { 
                await axios.post('http://localhost:3005/sendPayload', {
                    userId: job.data.userId,
                    payload: job.data
                })
                console.log(job.data);

            }
        },
        {
            connection: redisConnection
        }
    );
}