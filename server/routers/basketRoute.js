import express from 'express';

import { GetToBasket, AddToBasket, RemoveToBasket, ClearToBasket,
	UpdateToBasket, MergeToBasket } from "#controllers"
import { authMiddleware, rateLimiterMiddleware } from "#middlewares"

import { basketAddItemsValidation,
	basketProductIdAndQuantityValidation,
	basketProductIdValidation } from "#validations"

const router = express.Router();

router.get('/', authMiddleware, rateLimiterMiddleware(), GetToBasket)
router.post('/', authMiddleware, basketProductIdAndQuantityValidation, rateLimiterMiddleware(), AddToBasket)

router.patch('/:productId', authMiddleware, basketProductIdAndQuantityValidation, rateLimiterMiddleware(),  UpdateToBasket)

router.delete('/:productId', authMiddleware, basketProductIdValidation, rateLimiterMiddleware(5),  RemoveToBasket)
router.delete('/clear', authMiddleware, rateLimiterMiddleware(), ClearToBasket)

router.post('/merge', authMiddleware, basketAddItemsValidation, rateLimiterMiddleware(10), MergeToBasket)



export default router;