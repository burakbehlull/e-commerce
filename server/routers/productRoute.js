import express from 'express';

import { GetProducts, CreateProduct, FindProductById, UpdateProduct, 
	DeleteProduct, UpdateToThumbnail, AddToImages, DeleteToImage, AddCategoryProduct,
	RemoveCategoryProduct, GetImage } from "#controllers"
	
import { multer } from '#config'
import { adminAuthMiddleware } from "#middlewares"

import { createProductValidation, updateProductValidation, productIdValidation,
  addCategoryToProductValidation, removeCategoryFromProductValidation } from "#validations"

const router = express.Router();

const fileUploads = multer.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 }
])

router.get('/', GetProducts)
router.get('/:id', FindProductById)
router.get('/:id/image', GetImage)

router.post('/', fileUploads, createProductValidation, CreateProduct)

router.put('/:id',   productIdValidation, updateProductValidation, adminAuthMiddleware, UpdateProduct)
router.delete('/:id', productIdValidation, adminAuthMiddleware, DeleteProduct)

router.post('/:id/images', multer.array("images", 10), productIdValidation, AddToImages)
router.put('/:id/thumbnail', multer.single("thumbnail"), productIdValidation, adminAuthMiddleware, UpdateToThumbnail)
router.delete('/:id/image', productIdValidation, DeleteToImage)

router.post('/:id/:categoryId', addCategoryToProductValidation, adminAuthMiddleware, AddCategoryProduct)
router.delete('/:id/:categoryId', removeCategoryFromProductValidation, adminAuthMiddleware, RemoveCategoryProduct)

export default router;