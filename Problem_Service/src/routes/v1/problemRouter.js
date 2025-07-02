import express from 'express';
import * as ProblemController from '../../controllers/problemController.js';
import * as testcaseController from '../../controllers/testcaseController.js';
import { authenticateToken, roleAuthorization } from '../../../../shared/middlewares/authMiddleware.js';
import { JWT_SECRET } from '../../config/serverConfig.js';

const problemRouter = express.Router();

problemRouter.post('/',authenticateToken(JWT_SECRET), roleAuthorization("admin"), ProblemController.createProblem);

problemRouter.get('/',  ProblemController.getProblems);

problemRouter.get('/:id',  ProblemController.getProblem);

problemRouter.put('/:id',authenticateToken(JWT_SECRET), roleAuthorization("admin"),  ProblemController.updateProblem);

problemRouter.delete('/:id',authenticateToken(JWT_SECRET), roleAuthorization("admin"),  ProblemController.deleteProblem);

problemRouter.post('/:id/testcases',authenticateToken(JWT_SECRET), roleAuthorization("admin"),  testcaseController.addTestcase);

problemRouter.get('/:id/testcases',authenticateToken(JWT_SECRET), roleAuthorization("admin"), testcaseController.getAllTestcase);

problemRouter.get('/:id/testcases/sample',authenticateToken(JWT_SECRET), roleAuthorization("admin","user"), testcaseController.getSampleTestcase);


export default problemRouter;