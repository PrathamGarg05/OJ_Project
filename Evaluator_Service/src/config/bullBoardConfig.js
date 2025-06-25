import {ExpressAdapter} from '@bull-board/express';
import {createBullBoard} from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter.js';
import SampleQueue from '../queues/SampleQueue.js';
import submissionQueue from '../queues/submissionQueue.js';


const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/ui');

createBullBoard({
  queues: [
    new BullMQAdapter(SampleQueue), 
    new BullMQAdapter(submissionQueue)
  ],
  serverAdapter,
});

export default serverAdapter;