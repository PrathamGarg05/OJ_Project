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
            const user = this.payload.userId;
            const language = this.payload.language;
            console.log(language);
            const code = this.payload.code;
            const input = this.payload.input;
            const output = this.payload.output;
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