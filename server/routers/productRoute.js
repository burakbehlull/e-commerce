import express from 'express';
import { multer } from '#config'

import { GetProducts, CreateProduct, FindProductById, UpdateProduct, 
	DeleteProduct, UpdateToThumbnail, AddToImages, DeleteToImage } from "#controllers"
import { adminAuthMiddleware } from "#middlewares"
const router = express.Router();

const fileUploads = multer.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 }
])

router.get('/', GetProducts)
router.get('/:id', FindProductById)

router.post('/', fileUploads, adminAuthMiddleware, CreateProduct)

router.put('/:id', adminAuthMiddleware, UpdateProduct)
router.delete('/:id', adminAuthMiddleware, DeleteProduct)

router.put('/:id/thumbnail', multer.single("thumbnail"), adminAuthMiddleware, UpdateToThumbnail)
router.post('/:id/images', multer.array("images", 10), adminAuthMiddleware, AddToImages)
router.delete('/:id/images', adminAuthMiddleware, DeleteToImage)

export default router;