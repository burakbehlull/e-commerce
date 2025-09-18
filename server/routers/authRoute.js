import express from 'express';

import { UserRegister, UserLogin, RefreshAccessToken } from "#controllers"
import { loginValidation, registerValidation } from "#validations"
const router = express.Router();

router.post('/register', registerValidation, UserRegister);
router.post('/login', loginValidation, UserLogin);

router.post('/refresh', RefreshAccessToken);

export default router;