import express from 'express';

import { UserInfo, UpdateUser, DeleteToUser } from "#controllers"
import { authMiddleware } from "#middlewares"

const router = express.Router();

router.post('/info', authMiddleware, UserInfo)
router.put('/:id', authMiddleware, UpdateUser)
router.delete('/:id', authMiddleware, DeleteToUser)

export default router;