import express from 'express';
import { multer } from '#config'

import { GetProducts, CreateProduct, FindProductById, UpdateProduct, DeleteProduct } from "#controllers"

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

export default router;