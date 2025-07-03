import { createSubmission, getSubmissions, getUserStats } from "../../controllers/submissionController.js";

export default async function submissionRoute(fastify, options) {
  fastify.post('/', createSubmission);
  fastify.get('/:userId/:problemId', getSubmissions);
  fastify.get('/stats/:userId', getUserStats);
}