import express from 'express';

import { GetToCategories, GetToCategoryByName, CreateToCategory, UpdateToCategoy, DeleteToCategory } from "#controllers"
import { adminAuthMiddleware } from "#middlewares"

const router = express.Router();

router.get('/', GetToCategories)
router.get('/', GetToCategoryByName)
router.post('/', CreateToCategory)
router.put('/', UpdateToCategoy)
router.delete('/', DeleteToCategory)


export default router;