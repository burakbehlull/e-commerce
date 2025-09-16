import express from 'express';

import { UserInfo, UpdateUser, DeleteToUser } from "#controllers"
import { authMiddleware, rateLimiterMiddleware } from "#middlewares"

const router = express.Router();

router.post('/info', authMiddleware, rateLimiterMiddleware, UserInfo)
router.put('/:id', authMiddleware, rateLimiterMiddleware, UpdateUser)
router.delete('/:id', authMiddleware, rateLimiterMiddleware, DeleteToUser)

export default router;