import express from 'express';
import connectDB from './config/dbConfig.js';
import apiRouter from './routes/apiRouter.js';
import { API_GATEWAY, PORT } from './config/serverConfig.js';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: true,
    credentials:true
}));

app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded({extended: true}));
app.use(express.text());

app.use('/api', apiRouter);

app.get('/ping', (req,res) => {
    return res.json({
        message: "ping working"
    });
});

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
    connectDB();
});