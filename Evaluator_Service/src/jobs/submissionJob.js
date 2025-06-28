import createExecutor from "../utils/ExecutorFactory.js";
import evaluationQueueProducer from "../producers/evaluationQueueProducer.js";
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
            const userId = this.payload.userId;
            const submissionId = this.payload.submissionId;
            const language = this.payload.language;
            console.log(language);
            const code = this.payload.code;
            const input = this.payload.input;
            const output = this.payload.output;
            const strategy = createExecutor(language);
            if(strategy != null) {
                const response = await strategy.execute(code,input,output);
                evaluationQueueProducer({response, userId: userId, submissionId: submissionId});
                if(response.status == "SUCCESS") {
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