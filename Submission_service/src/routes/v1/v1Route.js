import runRoute from './runRoute.js';
import submissionRoute from './SubmissionRoutes.js';

async function v1Plugin(fastify, options) {
    fastify.register(runRoute, {prefix : '/run'});
    fastify.register(submissionRoute, {prefix: '/submissions'});
}

export default v1Plugin;