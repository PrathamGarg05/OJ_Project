import { createSubmission } from "../../controllers/submissionController.js";

export default async function submissionRoute(fastify, options) {
  fastify.post('/', createSubmission);
}