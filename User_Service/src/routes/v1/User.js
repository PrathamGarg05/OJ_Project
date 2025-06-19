import express from 'express';
import { getAllUsers, login, myProfile, registerUser } from '../../controllers/userController.js';
import { authenticateToken } from '../../middlewares/AuthMiddleware.js';
import { roleAuthorization } from '../../middlewares/RoleMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);

userRouter.post('/login', login);

userRouter.get('/me', authenticateToken, roleAuthorization("admin","user"), myProfile);

userRouter.get('/ping', (req,res) => {
    return res.json({
        message : "User ping running"
    });
});

userRouter.get('/', authenticateToken, roleAuthorization("admin"), getAllUsers);

export default userRouter;