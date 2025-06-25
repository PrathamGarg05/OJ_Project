import { Job } from "bullmq";
import runCpp from "../containers/runCppDocker.js";

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
            const user1 = keys[0];
            if(this.payload[user1].language == "CPP") {
                const response = await runCpp(this.payload[user1].code, this.payload[user1].input);
                console.log("Evaluated response is", response);
            }
        }
    };
    failed = (job) => {
        console.log("job failed");
    };

}