import express from 'express';
import { registerUser } from '../../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.get('/ping', (req,res) => {
    return res.json({
        message : "User ping running"
    });
});

export default userRouter;