import express from 'express';

import { UserInfo, UpdateUser, DeleteToUser } from "#controllers"

const router = express.Router();

router.post('/info', UserInfo)
router.put('/:id', UpdateUser)
router.delete('/:id', DeleteToUser)

export default router;