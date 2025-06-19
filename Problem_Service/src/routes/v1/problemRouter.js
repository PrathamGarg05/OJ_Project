import express from 'express';
import * as ProblemController from '../../controllers/problemController.js';

const problemRouter = express.Router();

problemRouter.get('/', ProblemController.getProblems);

export default problemRouter;