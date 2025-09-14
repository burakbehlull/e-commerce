import express from 'express';

import { UserRegister } from "#controllers"

const router = express.Router();

// kullanıcıyı id'ye göre çekme (GET)
router.post('/', UserRegister);
// kullanıcı giriş (POST)
// kullanıcı güncelleme (PUT)
// kullanıcıyı silme (DELETE)

export default router;