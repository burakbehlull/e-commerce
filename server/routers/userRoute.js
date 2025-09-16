import express from 'express';

import { UserRegister, UserLogin, RefreshAccessToken, UserInfo } from "#controllers"

const router = express.Router();

router.post('/info', UserInfo)
router.post('/register', UserRegister);
router.post('/login', UserLogin);
router.post('/refresh', RefreshAccessToken);

// kullanıcı güncelleme (PUT)
// kullanıcıyı silme (DELETE)

export default router;