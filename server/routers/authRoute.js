import express from 'express';

import { UserRegister, UserLogin, RefreshAccessToken } from "#controllers"
import { loginValidation, registerValidation, authRouteRefreshAcessTokenValidation } from "#validations"
const router = express.Router();

router.post('/register', registerValidation, UserRegister);
router.post('/login', loginValidation, UserLogin);

router.post('/refresh', authRouteRefreshAcessTokenValidation, RefreshAccessToken);

export default router;