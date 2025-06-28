import createExecutor from "../utils/ExecutorFactory.js";
import evaluationQueueProducer from "../producers/evaluationQueueProducer.js";
import { getTestcases } from "../utils/fetchTestcases.js";
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
            const submissionId = this.payload._id;
            const language = this.payload.language;
            const code = this.payload.code;
            const testcases = await getTestcases(this.payload.problemId);
            const strategy = createExecutor(language);
            if(strategy != null) {
                const response = await strategy.execute(code,testcases.data);
                evaluationQueueProducer({verdict: response.verdict, userId: userId, submissionId: submissionId});
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