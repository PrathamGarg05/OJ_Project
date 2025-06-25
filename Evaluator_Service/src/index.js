import express from 'express';
import { PORT } from './config/serverConfig.js';
import SampleQueueProducer from './producers/SampleQueueProducer.js';
import SampleWorker from './workers/SampleWorker.js';
import bullBoardAdapter from './config/bullBoardConfig.js';
import apiRouter from './routes/apiRouter.js';
import runPython from './containers/runPythonDocker.js';
import runJava from './containers/runJavaDocker.js';

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

    SampleQueueProducer('SampleJob', {
        name: "Pratham",
        company: "ABC"
    });

    SampleWorker("SampleQueue");

    const code = `
    import java.util.*;
    public class Main{
        public static void main(String args[]) {
            Scanner sc = new Scanner(System.in);
            int input = sc.nextInt();
            System.out.println("Input is "+input);
        }
    }
    `;
    runJava(code, `100`,10);
});