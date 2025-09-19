import express from 'express';

import { GetToBasket, AddToBasket,
	RemoveToBasket,
	ClearToBasket,
	UpdateToBasket,
	MergeToBasket } from "#controllers"
import { authMiddleware } from "#middlewares"

const router = express.Router();

router.get('/', authMiddleware, GetToBasket)
router.post('/', authMiddleware, AddToBasket)

router.patch('/', authMiddleware, UpdateToBasket)

router.delete('/:productId', authMiddleware, RemoveToBasket)
router.delete('/clear', authMiddleware, ClearToBasket)

router.post('/merge', authMiddleware, MergeToBasket)



export default router;