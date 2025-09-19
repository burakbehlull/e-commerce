import express from 'express';

import { UserInfo, UpdateUser, DeleteToUser, UserLogout } from "#controllers"
import { authMiddleware, rateLimiterMiddleware } from "#middlewares"

const router = express.Router();

router.post('/me', authMiddleware, rateLimiterMiddleware(), UserInfo)
router.put('/:id', authMiddleware, rateLimiterMiddleware(5), UpdateUser)
router.delete('/:id', authMiddleware, rateLimiterMiddleware(5), DeleteToUser)

router.post('/:id/logout', authMiddleware, rateLimiterMiddleware(5), UserLogout)

export default router;