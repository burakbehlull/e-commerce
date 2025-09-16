import express from 'express';

import { UserRegister, UserLogin, RefreshAccessToken } from "#controllers"

const router = express.Router();

router.post('/register', UserRegister);
router.post('/login', UserLogin);

router.post('/refresh', RefreshAccessToken);

export default router;