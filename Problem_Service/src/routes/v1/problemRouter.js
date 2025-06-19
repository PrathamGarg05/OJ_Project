import express from 'express';
import * as ProblemController from '../../controllers/problemController.js';
import * as testcaseController from '../../controllers/testcaseController.js';

const problemRouter = express.Router();

problemRouter.post('/',ProblemController.createProblem);

problemRouter.get('/', ProblemController.getProblems);

problemRouter.get('/:id', ProblemController.getProblem);

problemRouter.put('/:id', ProblemController.updateProblem);

problemRouter.delete('/:id', ProblemController.deleteProblem);

problemRouter.post('/:id/testcases', testcaseController.addTestcase);

problemRouter.get('/:id/testcases', testcaseController.getAllTestcase);

export default problemRouter;