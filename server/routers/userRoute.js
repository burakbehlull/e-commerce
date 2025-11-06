import express from 'express';

import { UserInfo, UpdateUser, DeleteToUser, UserLogout, UserInfoGetByToken } from "#controllers"
import { authMiddleware, rateLimiterMiddleware } from "#middlewares"

import { userInfoValidation, updateUserValidation, deleteUserValidation } from "#validations"

const router = express.Router();

router.get('/me', authMiddleware, rateLimiterMiddleware(), UserInfoGetByToken)
router.post('/me', userInfoValidation, authMiddleware, rateLimiterMiddleware(), UserInfo)
router.put('/me', updateUserValidation, authMiddleware, rateLimiterMiddleware(5), UpdateUser)
router.delete('/:id', deleteUserValidation, rateLimiterMiddleware(5), DeleteToUser)

router.post('/:id/logout', authMiddleware, rateLimiterMiddleware(5), UserLogout)

export default router;