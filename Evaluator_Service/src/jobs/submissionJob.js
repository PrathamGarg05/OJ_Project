import createExecutor from "../utils/ExecutorFactory.js";
import evaluationQueueProducer from "../producers/evaluationQueueProducer.js";
import { getSampleTestcases, getTestcases } from "../utils/fetchTestcases.js";
import axios from 'axios';
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

            if(this.payload.type == "custom") {
                const testcase = this.payload.testcase;
                const strategy = createExecutor(language);
                if(strategy != null) {
                    const response = await strategy.execute(code, testcase);
                    console.log(response);
                    if(response.status == "Completed") {
                        console.log("Code executed successfully");
                        console.log(response);
                    } else {
                        console.log("Code execution failed");
                        console.log(response);
                    }
                    await axios.post('http://localhost:3005/sendPayload', {
                        userId: userId,
                        payload: {
                            verdict: response.verdict,
                            userId: userId,
                            results: response.results,
                            error : response?.error
                        }
                    });
                }
                
            }

            else if(this.payload.type == "run") {
                const testcases = await getSampleTestcases(this.payload.problemId);
                const strategy = createExecutor(language);
                if(strategy != null) {
                    const response = await strategy.execute(code, testcases.data);
                    if(response.status == "Completed") {
                        console.log("Code executed successfully");
                        console.log(response);
                    } else {
                        console.log("Code execution failed");
                        console.log(response);
                    }
                    await axios.post('http://localhost:3005/sendPayload', {
                        userId: userId,
                        payload: {
                            verdict: response.verdict,
                            userId: userId,
                            results: response.results,
                            passed: response.passed, 
                            total: response.total,
                            error : response?.error
                        }
                    });
                }
                
            }
            else{
                const testcases = await getTestcases(this.payload.problemId);
                const strategy = createExecutor(language);
                if(strategy != null) {
                    const response = await strategy.execute(code,testcases.data);
                    evaluationQueueProducer({
                        verdict: response.verdict, 
                        userId: userId, 
                        submissionId: submissionId, 
                        passed: response.passed, 
                        total: response.total,
                        error : response?.error
                    });
                    if(response.status == "Completed") {
                        console.log("Code executed successfully");
                        console.log(response);
                    } else {
                        console.log("Code execution failed");
                        console.log(response);
                    }
                }
            }
            
        }
    };
    failed = (job) => {
        console.log("job failed");
    };

}