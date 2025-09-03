import { Router } from "express";
import { changePassword, isUserLogin, login, logout, me, register, updateMe } from "../controllers/auth";
import { auth } from "../middleware/auth";
import { googleCallback, googleLogin, googleStatus } from "../controllers/google";

const authRouter = Router();

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.get('/google/start', googleLogin)
authRouter.get('/google/callback', googleCallback)
authRouter.get('/google/status', googleStatus)
authRouter.get('/isUserLogin', isUserLogin)
authRouter.get('/me', auth, me)
authRouter.patch('/me', auth, updateMe)
authRouter.post('/change-password', auth, changePassword)

export default authRouter;