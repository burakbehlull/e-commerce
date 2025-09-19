import { body, param } from "express-validator";
import { handleValidationErrors } from "#validations";

const createProductValidation = [
  body("name")
    .notEmpty().withMessage("Ürün adı gerekli")
    .isString().withMessage("Ürün adı string olmalı"),

  body("description")
    .notEmpty().withMessage("Ürün açıklaması gerekli")
    .isString().withMessage("Ürün açıklaması string olmalı"),

  body("price")
    .notEmpty().withMessage("Ürün fiyatı gerekli")
    .isFloat({ min: 0 }).withMessage("Fiyat 0 veya daha büyük olmalı"),

  body("stock")
    .optional()
    .isInt({ min: 0 }).withMessage("Stok 0 veya daha büyük olmalı"),

  body("category")
    .optional()
    .isArray().withMessage("Kategori array olmalı"),

  handleValidationErrors,
];

const updateProductValidation = [
  param("id")
    .notEmpty().withMessage("Ürün ID gerekli")
    .isString().withMessage("Geçerli bir ürün kimliği giriniz"),

  body("name")
    .optional()
    .isString().withMessage("Ürün adı string olmalı"),

  body("description")
    .optional()
    .isString().withMessage("Ürün açıklaması string olmalı"),

  body("price")
    .optional()
    .isFloat({ min: 0 }).withMessage("Fiyat 0 veya daha büyük olmalı"),

  body("stock")
    .optional()
    .isInt({ min: 0 }).withMessage("Stok 0 veya daha büyük olmalı"),

  body("category")
    .optional()
    .isArray().withMessage("Kategori array olmalı"),

  handleValidationErrors,
];

const productIdValidation = [
  param("id")
    .notEmpty().withMessage("Ürün ID gerekli")
    .isString().withMessage("Geçerli bir MongoDB ObjectId giriniz"),
  
  handleValidationErrors,
];

const addCategoryToProductValidation = [
  param("id")
    .notEmpty().withMessage("Ürün ID gerekli")
    .isString().withMessage("Geçerli bir Ürün  giriniz"),

  body("categoryId")
    .notEmpty().withMessage("Kategori ID gerekli")
    .isMongoId().withMessage("Geçerli bir MongoDB ObjectId giriniz"),

  handleValidationErrors,
];

const removeCategoryFromProductValidation = addCategoryToProductValidation;

export {
  createProductValidation,
  updateProductValidation,
  productIdValidation,
  addCategoryToProductValidation,
  removeCategoryFromProductValidation,
};
