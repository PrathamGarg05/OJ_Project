import express from 'express';
import * as ProblemController from '../../controllers/problemController.js';
import * as testcaseController from '../../controllers/testcaseController.js';
import { authenticateToken, roleAuthorization } from '../../middlewares/authMiddleware.js';
import { JWT_SECRET } from '../../config/serverConfig.js';
import { getAiReview, getBoilerplate, getHint } from '../../controllers/aiController.js';

const problemRouter = express.Router();

problemRouter.post('/',authenticateToken(JWT_SECRET), roleAuthorization("admin"), ProblemController.createProblem);

problemRouter.get('/',  ProblemController.getProblems);

problemRouter.get('/:id',  ProblemController.getProblem);

problemRouter.put('/:id',authenticateToken(JWT_SECRET), roleAuthorization("admin"),  ProblemController.updateProblem);

problemRouter.delete('/:id',authenticateToken(JWT_SECRET), roleAuthorization("admin"),  ProblemController.deleteProblem);

problemRouter.post('/:id/testcases',authenticateToken(JWT_SECRET), roleAuthorization("admin"),  testcaseController.addTestcase);

problemRouter.get('/:id/testcases',authenticateToken(JWT_SECRET), roleAuthorization("admin"), testcaseController.getAllTestcase);

problemRouter.get('/:id/testcases/sample', testcaseController.getSampleTestcase);

problemRouter.get('/:id/hint',authenticateToken(JWT_SECRET), roleAuthorization("admin","user"), getHint);

problemRouter.get('/:id/boilerplate/:language',authenticateToken(JWT_SECRET), roleAuthorization("admin","user"), getBoilerplate);

problemRouter.post('/:id/ai-review',authenticateToken(JWT_SECRET), roleAuthorization("admin","user"), getAiReview);

export default problemRouter;