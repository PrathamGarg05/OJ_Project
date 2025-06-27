import fastifyPlugin from 'fastify-plugin';
import v1Route from './v1/v1Route.js';

async function apiPlugin(fastify, options) {
    fastify.register(v1Route, {prefix : '/v1'});
}

export default apiPlugin;