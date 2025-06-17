import express from 'express';
import connectDB from './config/dbConfig.js';

const app = express();

app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded({extended: true}));
app.use(express.text());



app.listen(3000, () => {
    console.log(`Server running at port 3000`);
    connectDB();
});