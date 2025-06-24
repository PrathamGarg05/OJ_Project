import express from 'express';
import { PORT } from './config/serverConfig.js';
import SampleQueueProducer from './producers/SampleQueueProducer.js';
import SampleWorker from './workers/SampleWorker.js';
import bullBoardAdapter from './config/bullBoardConfig.js';

const app = express();
app.use('/ui', bullBoardAdapter.getRouter());

app.listen(PORT, ()=> {
    console.log(`Server running at ${PORT}`);

    console.log(`BullBoard dashboard running on
        http://localhost:${PORT}/ui`);

    SampleQueueProducer('SampleJob', {
        name: "Pratham",
        company: "ABC"
    });

    SampleWorker("SampleQueue");
});