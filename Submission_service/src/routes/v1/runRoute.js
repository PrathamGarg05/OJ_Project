import { runProblem } from "../../controllers/submissionController.js";

export default async function runRoute(fastify, options) {
    fastify.post('/', runProblem);
}
