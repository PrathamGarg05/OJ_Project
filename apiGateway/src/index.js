import express from 'express';
import proxy from 'express-http-proxy';
import cors from 'cors';
import { PORT, USER_SERVICE_URL } from './config/serverConfig.js';

const app = express();

app.use(cors());

app.use(
  '/api/v1/users',
  proxy(USER_SERVICE_URL, {
    proxyReqPathResolver: (req) => `/api/v1/users${req.url}`,
  })
);

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});