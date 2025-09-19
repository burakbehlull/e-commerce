import { body, param } from "express-validator";
import { handleValidationErrors } from "#validations";

const basketProductIdAndQuantityValidation = [
  body("productId")
    .notEmpty().withMessage("Product ID gerekli")
    .isMongoId().withMessage("Geçerli bir MongoDB ObjectId giriniz"),

  body("quantity")
    .optional()
    .isInt({ min: 1 }).withMessage("Quantity en az 1 olmalı"),

  handleValidationErrors,
];

const basketProductIdValidation = [
  param("productId")
    .notEmpty().withMessage("Product ID gerekli")
    .isMongoId().withMessage("Geçerli bir MongoDB ObjectId giriniz"),
	
  handleValidationErrors,
];

const basketAddItemsValidation = [
  body("items")
	.optional()
    .isArray({ min: 0 }).withMessage("Ürün listesi, array olmalıdır"),
	
  handleValidationErrors
]

export {
	basketAddItemsValidation,
	basketProductIdAndQuantityValidation,
	basketProductIdValidation
}
