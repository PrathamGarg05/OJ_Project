import Fastify from 'fastify';
import { PORT } from './config/serverConfig.js';
import fastifyApp from './app.js';
import { connectDB } from './config/dbConfig.js';
import {fastifyFormbody} from '@fastify/formbody'
import EvaluationWorker from './workers/evaluationWorker.js';

const fastify = Fastify({ logger: true });

fastify.register(fastifyFormbody);

fastify.register(fastifyApp);

fastify.listen({ port: PORT }, async (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  await connectDB();

  EvaluationWorker("EvaluationQueue")

  console.log(`Server running on http://localhost:${PORT}`);
});
