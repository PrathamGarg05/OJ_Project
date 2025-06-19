import express from 'express';
import problemRouter from './problemRouter.js';
import testcaseRouter from './testcaseRouter.js';


const v1Router = express.Router();

v1Router.use('/problems', problemRouter);
v1Router.use('/testcases', testcaseRouter);

export default v1Router;