import express from 'express';

import { GetToBasket, AddToBasket, RemoveToBasket, ClearToBasket,
	UpdateToBasket, MergeToBasket } from "#controllers"
import { authMiddleware, rateLimiterMiddleware } from "#middlewares"

const router = express.Router();

router.get('/', authMiddleware, rateLimiterMiddleware(), GetToBasket)
router.post('/', authMiddleware, rateLimiterMiddleware(), AddToBasket)

router.patch('/', authMiddleware,rateLimiterMiddleware(),  UpdateToBasket)

router.delete('/:productId', authMiddleware, rateLimiterMiddleware(5),  RemoveToBasket)
router.delete('/clear', authMiddleware, rateLimiterMiddleware(), ClearToBasket)

router.post('/merge', authMiddleware, rateLimiterMiddleware(10), MergeToBasket)



export default router;