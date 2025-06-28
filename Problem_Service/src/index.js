import express from 'express';
import { API_GATEWAY, PORT } from './config/serverConfig.js';
import apiRouter from './routes/apiRouter.js';
import internalRouter from './routes/internalRoute.js';
import { connectDB } from './config/dbConfig.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());

app.use(cors({
    origin: true,
    credentials:true
}));



app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded({extended: true}));
app.use(express.text());



app.use('/api', apiRouter);
app.use('/internal-api', internalRouter);

app.listen(PORT, () => {
    console.log(`Server running at Port ${PORT}`);
    connectDB();
});