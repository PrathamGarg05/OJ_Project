import express from 'express';
import { INTERNAL_API_KEY } from '../config/serverConfig.js';
import * as TestcaseController from '../controllers/testcaseController.js';


const internalRouter = express.Router();

const verifyInternalApiKey = (req, res, next) => {
  const apiKey = req.headers['x-internal-api-key'];
  if (!apiKey || apiKey !== INTERNAL_API_KEY) {
    return res.status(401).json({ message: 'Unauthorized: Invalid API Key' });
  }
  next();
};

// Internal-only route
internalRouter.get('/internal/problems/:id/testcases', verifyInternalApiKey, TestcaseController.getAllTestcase);

export default internalRouter;