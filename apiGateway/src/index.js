import express from 'express';
import proxy from 'express-http-proxy';
import cors from 'cors';
import {  PORT, PROBLEM_SERVICE_URL, SUBMISSION_SERVICE_URL, USER_SERVICE_URL } from './config/serverConfig.js';

const app = express();

app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true, 
}));

app.use(
  '/api/v1/users',
  proxy(USER_SERVICE_URL, {
    proxyReqPathResolver: (req) => `/api/v1/users${req.url}`
  })
);

app.use(
  '/api/v1/problems',
  proxy(PROBLEM_SERVICE_URL, {
    proxyReqPathResolver: (req) => `/api/v1/problems${req.url}`,
  })
);

app.use(
  '/api/v1/testcases',
  proxy(PROBLEM_SERVICE_URL, {
    proxyReqPathResolver: (req) => `/api/v1/testcases${req.url}`,
  })
);

app.use(
  '/api/v1/submissions',
  proxy(SUBMISSION_SERVICE_URL, {
    proxyReqPathResolver: (req) => `/api/v1/submissions${req.url}`,
  })
);

app.use(
  '/api/v1/run',
  proxy(SUBMISSION_SERVICE_URL, {
    proxyReqPathResolver: (req) => `/api/v1/run${req.url}`,
  })
);

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});