import express from 'express';
import { PORT } from './config/serverConfig.js';
import apiRouter from './routes/apiRouter.js';

const app = express();

app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRouter);
app.use(express.text());

app.listen(PORT, () => {
    console.log(`Server running at Port ${PORT}`);
});