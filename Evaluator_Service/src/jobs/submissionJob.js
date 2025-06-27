import { Job } from "bullmq";
import runCpp from "../containers/runCppDocker.js";
import createExecutor from "../utils/ExecutorFactory.js";

export default class SubmissionJob{
    name;
    payload;
    constructor (payload) {
        this.name = this.constructor.name;
        this.payload = payload;
    }
    handle = async (job) => {
        console.log("job handler called", job.name);
        console.log(this.payload);
        if(job) {
            const keys = Object.keys(this.payload);
            const key = keys[0];
            const language = this.payload[key].language;
            const code = this.payload[key].code;
            const input = this.payload[key].input;
            const output = this.payload[key].output;
            const strategy = createExecutor(language);
            if(strategy != null) {
                const response = await strategy.execute(code,input,output);
                if(response.status == "Completed") {
                    console.log("Code executed successfully");
                    console.log(response);
                } else {
                    console.log("Code execution failed");
                    console.log(response);
                }
            }
        }
    };
    failed = (job) => {
        console.log("job failed");
    };

}