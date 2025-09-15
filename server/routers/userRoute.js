import express from 'express';

import { UserRegister, UserLogin, RefreshAccessToken } from "#controllers"

const router = express.Router();

// kullanıcıyı id'ye göre çekme (GET)
router.post('/', UserRegister);
router.post('/login', UserLogin);
router.post('/refresh', RefreshAccessToken);
// kullanıcı giriş (POST)
// kullanıcı güncelleme (PUT)
// kullanıcıyı silme (DELETE)

export default router;