import { Job } from "bullmq";
import { IJob } from "../types/bullMQJobDef";

class SampleJob implements IJob {
    name: String;
    payload: Record<string, unknown>;
    constructor( payload: Record<string, unknown>){
        this.payload = payload;
        this.name = this.constructor.name;
    }

    handle = () => {
        console.log("handler of job");
    }

    failed = (job?: Job) : void => {
        console.log("job failed", job?.id);
    }
}

export default SampleJob;