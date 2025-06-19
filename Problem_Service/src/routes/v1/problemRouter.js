import express from 'express';
import * as ProblemController from '../../controllers/problemController.js';

const problemRouter = express.Router();

problemRouter.post('/',ProblemController.createProblem);

problemRouter.get('/', ProblemController.getProblems);

export default problemRouter;