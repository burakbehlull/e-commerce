import express from 'express';
import { multer } from '#config'

import { GetProducts, CreateProduct, FindProductById, UpdateProduct, 
	DeleteProduct, UpdateToThumbnail, AddToImages, DeleteToImage } from "#controllers"

const router = express.Router();

const fileUploads = multer.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 }
])

router.get('/', GetProducts)
router.post('/', fileUploads, CreateProduct)

router.get('/:id', FindProductById)

router.put('/:id', UpdateProduct)
router.delete('/:id', DeleteProduct)

router.put('/:id/thumbnail', multer.single("thumbnail"), UpdateToThumbnail)
router.post('/:id/images', multer.array("images", 10), AddToImages)
router.delete('/:id/images', DeleteToImage)

export default router;