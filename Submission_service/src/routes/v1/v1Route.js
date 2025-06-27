import fastifyPlugin from 'fastify-plugin';
import testRoute from './testRouter.js';
import submissionRoute from './SubmissionRoutes.js';

async function v1Plugin(fastify, options) {
    fastify.register(testRoute, {prefix : '/test'});
    fastify.register(submissionRoute, {prefix: '/submissions'});
}

export default v1Plugin;