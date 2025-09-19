import express from 'express';

import { GetToCategories, GetToCategoryByName, CreateToCategory, UpdateToCategoy, DeleteToCategory } from "#controllers"
import { adminAuthMiddleware, rateLimiterMiddleware } from "#middlewares"

const router = express.Router();

router.get('/', rateLimiterMiddleware(), GetToCategories)
router.get('/', rateLimiterMiddleware(), GetToCategoryByName)
router.post('/', adminAuthMiddleware, CreateToCategory)
router.put('/', adminAuthMiddleware, UpdateToCategoy)
router.delete('/', adminAuthMiddleware, DeleteToCategory)


export default router;