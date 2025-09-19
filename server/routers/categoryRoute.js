import express from 'express';

import { GetToCategories, GetToCategoryByName, CreateToCategory, UpdateToCategoy, DeleteToCategory } from "#controllers"
import { adminAuthMiddleware, rateLimiterMiddleware } from "#middlewares"

import { getCategoryByNameValidation, createCategoryValidation, updateCategoryValidation,
	deleteCategoryValidation } from "#validations"
	
const router = express.Router();

router.get('/all', rateLimiterMiddleware(), GetToCategories)
router.get('/', getCategoryByNameValidation, rateLimiterMiddleware(), GetToCategoryByName)
router.post('/', createCategoryValidation, adminAuthMiddleware, CreateToCategory)
router.put('/:id', updateCategoryValidation, adminAuthMiddleware, UpdateToCategoy)
router.delete('/:id', deleteCategoryValidation, adminAuthMiddleware, DeleteToCategory)


export default router;