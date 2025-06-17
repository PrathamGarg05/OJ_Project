import express from 'express';
import { login, myProfile, registerUser } from '../../controllers/userController.js';
import { authenticateToken } from '../../middlewares/AuthMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);

userRouter.post('/login', login);

userRouter.get('/me', authenticateToken, myProfile);

userRouter.get('/ping', (req,res) => {
    return res.json({
        message : "User ping running"
    });
});

export default userRouter;