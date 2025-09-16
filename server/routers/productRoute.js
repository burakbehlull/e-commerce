import express from 'express';

import { GetProducts, CreateProduct, FindProductById, UpdateProduct, DeleteProduct } from "#controllers"

const router = express.Router();

router.get('/', GetProducts)
router.post('/', CreateProduct)

router.get('/:id', FindProductById)

router.put('/:id', UpdateProduct)
router.delete('/:id', DeleteProduct)

export default router;