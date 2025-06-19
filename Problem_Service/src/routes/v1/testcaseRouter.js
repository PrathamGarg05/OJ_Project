import express from 'express';
import * as testcaseController from '../../controllers/testcaseController.js';
const testcaseRouter = express.Router();

testcaseRouter.put('/:id', testcaseController.updateTestcase);

testcaseRouter.delete('/:id', testcaseController.deleteTestcase);

export default testcaseRouter;