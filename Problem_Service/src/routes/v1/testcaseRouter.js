import express from 'express';
import * as testcaseController from '../../controllers/testcaseController.js';
import { authenticateToken, roleAuthorization } from '../../../../shared/middlewares/authMiddleware.js';
import { JWT_SECRET } from '../../config/serverConfig.js';
const testcaseRouter = express.Router();

testcaseRouter.put('/:id',authenticateToken(JWT_SECRET), roleAuthorization("admin"), testcaseController.updateTestcase);

testcaseRouter.delete('/:id',authenticateToken(JWT_SECRET), roleAuthorization("admin"), testcaseController.deleteTestcase);

export default testcaseRouter;