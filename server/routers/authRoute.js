import express from 'express';

import { UserRegister, UserLogin, RefreshAccessToken } from "#controllers"
import { loginValidation } from "#validations"
const router = express.Router();

router.post('/register', UserRegister);
router.post('/login', loginValidation, UserLogin);

router.post('/refresh', RefreshAccessToken);

export default router;