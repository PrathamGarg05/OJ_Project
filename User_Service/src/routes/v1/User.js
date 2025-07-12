import express from 'express';
import { getAllUsers, login, myProfile, registerUser, useHint, verifyEmail } from '../../controllers/userController.js';
import { authenticateToken, roleAuthorization } from '../../middlewares/authMiddleware.js';
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

userRouter.post('/logout', authenticateToken(JWT_SECRET), (req,res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'lax'
    });
    res.status(200).json({message: "Logged out successfully"});
});

userRouter.patch('/:id/hint', useHint);

userRouter.post('/verify-email', verifyEmail);



export default userRouter;