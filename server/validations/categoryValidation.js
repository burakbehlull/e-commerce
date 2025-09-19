import { body, param } from "express-validator";
import { handleValidationErrors } from "#validations";


const getCategoryByNameValidation = [
  param("name")
    .notEmpty().withMessage("Kategori Adı gerekli")
    .isString().withMessage("Geçerli bir slug id giriniz"),

  handleValidationErrors,
];

const createCategoryValidation = [
  body("name")
    .notEmpty().withMessage("Kategori adı gerekli")
    .isString().withMessage("Kategori adı string olmalı")
    .isLength({ min: 2 }).withMessage("Kategori adı en az 2 karakter olmalı"),

  body("description")
    .optional()
    .isString().withMessage("Açıklama metin tipinde olmalı"),

  handleValidationErrors,
];

const updateCategoryValidation = [
  param("id")
    .notEmpty().withMessage("Kategori ID gerekli")
    .isMongoId().withMessage("Geçerli bir MongoDB ObjectId giriniz"),

  body("name")
    .optional()
    .isString().withMessage("Kategori adı string olmalı")
    .isLength({ min: 2 }).withMessage("Kategori adı en az 2 karakter olmalı"),

  body("description")
    .optional()
    .isString().withMessage("Açıklama metin tipinde olmalı"),

  handleValidationErrors,
];

const deleteCategoryValidation = [
  param("id")
    .notEmpty().withMessage("Kategori ID gerekli")
    .isMongoId().withMessage("Geçerli bir MongoDB ObjectId giriniz"),

  handleValidationErrors,
];


export {
  getCategoryByNameValidation,
  createCategoryValidation,
  updateCategoryValidation,
  deleteCategoryValidation,
};
