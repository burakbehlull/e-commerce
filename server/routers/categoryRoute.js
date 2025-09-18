import express from 'express';

import { GetToCategories, GetToCategoryByName, CreateToCategory, UpdateToCategoy, DeleteToCategory } from "#controllers"
import { adminAuthMiddleware } from "#middlewares"

const router = express.Router();

router.get('/', GetToCategories)
router.get('/', GetToCategoryByName)
router.post('/', adminAuthMiddleware, CreateToCategory)
router.put('/', adminAuthMiddleware, UpdateToCategoy)
router.delete('/', adminAuthMiddleware, DeleteToCategory)


export default router;