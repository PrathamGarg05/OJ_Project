import express from 'express';
import { PORT } from './config/serverConfig.js';
import SampleQueueProducer from './producers/SampleQueueProducer.js';
import SampleWorker from './workers/SampleWorker.js';

const app = express();

app.listen(PORT, ()=> {
    console.log(`Server running at ${PORT}`);

    SampleQueueProducer('SampleJob', {
        name: "Pratham",
        company: "ABC"
    });

    SampleWorker("SampleQueue");
});