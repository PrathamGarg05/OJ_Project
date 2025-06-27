import { pingCheck } from "../../controllers/submissionController.js";

export default async function testRoute(fastify, options) {
  fastify.get('/ping', pingCheck);
}
