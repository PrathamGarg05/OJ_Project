import express from 'express';
import * as ProblemController from '../../controllers/problemController.js';

const problemRouter = express.Router();

problemRouter.post('/',ProblemController.createProblem);

problemRouter.get('/', ProblemController.getProblems);

problemRouter.get('/:id', ProblemController.getProblem);

problemRouter.put('/:id', ProblemController.updateProblem);

export default problemRouter;