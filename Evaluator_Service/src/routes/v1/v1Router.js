import express from 'express' ;
import subRouter from './submissionRouter.js';

const v1Router = express.Router();

v1Router.use('/submissions', subRouter);

export default v1Router;