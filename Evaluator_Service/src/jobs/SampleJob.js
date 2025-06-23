import { Job } from "bullmq";

export default class SampleJob{
    name;
    payload;
    constructor (payload) {
        this.name = this.constructor.name;
        this.payload = payload;
    }
    handle = (job) => {
        console.log("job handler called", job.name);
        console.log(this.payload);
    };
    failed = (job) => {
        console.log("job failed");
    };

}