import express from 'express';
import { PORT } from './config/serverConfig.js';
import bullBoardAdapter from './config/bullBoardConfig.js';
import apiRouter from './routes/apiRouter.js';
import SubmissionWorker from './workers/submissionWorker.js';
import { submission_queue } from './utils/constants.js';
import submissionQueueProducer from './producers/submissionQueueProducer.js';

const app = express();
app.use('/ui', bullBoardAdapter.getRouter());

app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded({extended: true}));
app.use(express.text());

app.use('/api', apiRouter);

app.listen(PORT, ()=> {
    console.log(`Server running at ${PORT}`);

    console.log(`BullBoard dashboard running on
        http://localhost:${PORT}/ui`);

    const code = `
    #include<iostream>
    using namespace std;

    int main(){
        int x;
        cin>>x;
        cout<<"Value of x is "<<x<<endl;
        for(int i=0;i<x;i++){
        cout<<i<<"  ";
        }
    }
    `;

    const input = `5`;
    const output = `5`;

    // submissionQueueProducer({
    //     "1234" : {
    //         language: "CPP",
    //         code: code,
    //         input: input,
    //         output: output
    //     }
    // });
    SubmissionWorker(submission_queue);

    const Javacode = `
    import java.util.*;
    public class Main{
        public static void main(String args[]) {
            Scanner sc = new Scanner(System.in);
            int input = sc.nextInt();
            System.out.println("Input is "+input);
        }
    }
    `;
});