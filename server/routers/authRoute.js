import express from 'express';

import { UserRegister, UserLogin, RefreshAccessToken } from "#controllers"
import { registerValidation, loginValidation, authRouteRefreshAcessTokenValidation } from "#validations"
import { rateLimiterMiddleware } from "#middlewares"

const router = express.Router();

router.post('/register', registerValidation, rateLimiterMiddleware(5), UserRegister);
router.post('/login', loginValidation, rateLimiterMiddleware(5), UserLogin);

router.post('/refresh', authRouteRefreshAcessTokenValidation, rateLimiterMiddleware(5), RefreshAccessToken);

export default router;