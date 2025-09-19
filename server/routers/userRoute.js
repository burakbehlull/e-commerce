import express from 'express';

import { UserInfo, UpdateUser, DeleteToUser, UserLogout } from "#controllers"
import { authMiddleware, rateLimiterMiddleware } from "#middlewares"

const router = express.Router();

router.post('/me', authMiddleware, rateLimiterMiddleware, UserInfo)
router.put('/:id', authMiddleware, rateLimiterMiddleware, UpdateUser)
router.delete('/:id', authMiddleware, rateLimiterMiddleware, DeleteToUser)

router.post('/:id/logout', authMiddleware, rateLimiterMiddleware, UserLogout)

export default router;