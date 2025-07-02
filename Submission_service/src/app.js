import fastifyPlugin from 'fastify-plugin';
import cors from '@fastify/cors';
import apiRouter from './routes/apiRouter.js';

async function appPlugin(fastify, options) {
  await fastify.register(cors, {
    origin: true,
    credentials: true
  });
  await fastify.register(apiRouter, { prefix: '/api' });
  
}

export default fastifyPlugin(appPlugin);
