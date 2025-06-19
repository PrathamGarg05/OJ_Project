import express from 'express';
import { getAllUsers, login, myProfile, registerUser } from '../../controllers/userController.js';
import { authenticateToken, roleAuthorization } from '../../../../shared/middlewares/authMiddleware.js';
import { JWT_SECRET } from '../../config/serverConfig.js';
const userRouter = express.Router();

userRouter.post('/register', registerUser);

userRouter.post('/login', login);

userRouter.get('/me', authenticateToken(JWT_SECRET), roleAuthorization("admin","user"), myProfile);

userRouter.get('/ping', (req,res) => {
    return res.json({
        message : "User ping running"
    });
});

userRouter.get('/', authenticateToken(JWT_SECRET), roleAuthorization("admin"), getAllUsers);

export default userRouter;