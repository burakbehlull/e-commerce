import express from 'express';

import { UserRegister, UserLogin, RefreshAccessToken, UserInfo, 
	UpdateUser, DeleteToUser } from "#controllers"

const router = express.Router();

router.post('/info', UserInfo)
router.post('/register', UserRegister);
router.post('/login', UserLogin);

router.post('/refresh', RefreshAccessToken);

router.put('/:id', UpdateUser)
router.delete('/:id', DeleteToUser)

export default router;