import {ExpressAdapter} from '@bull-board/express';
import {createBullBoard} from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter.js';
import SampleQueue from '../queues/SampleQueue.js';


const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/ui');

createBullBoard({
  queues: [
    new BullMQAdapter(SampleQueue), 
  ],
  serverAdapter,
});

export default serverAdapter;