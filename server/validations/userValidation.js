import { body, param } from "express-validator";
import { handleValidationErrors } from "#validations";

const updateUserValidation = [
  param("id")
    .notEmpty().withMessage("Kullanıcı ID gerekli")
    .isMongoId().withMessage("Geçerli bir MongoDB ObjectId giriniz"),

  body("username")
    .optional()
    .isString().withMessage("Kullanıcı adı string olmalı")
    .isLength({ min: 3 }).withMessage("Kullanıcı adı en az 3 karakter olmalı"),

  body("email")
    .optional()
    .isEmail().withMessage("Geçerli bir email adresi giriniz"),

  body("phone")
    .optional()
    .isString().withMessage("Telefon numarası string olmalı"),

  body("role")
    .optional()
    .isIn(["admin", "customer"]).withMessage("Rol admin veya customer olmalı"),

  handleValidationErrors,
];

const deleteUserValidation = [
  param("id")
    .notEmpty().withMessage("Kullanıcı ID gerekli")
    .isMongoId().withMessage("Geçerli bir MongoDB ObjectId giriniz"),

  handleValidationErrors,
];

const userInfoValidation = [
  body("_id")
    .optional()
    .isMongoId().withMessage("Geçerli bir MongoDB ObjectId giriniz"),

  body("username")
    .optional()
    .isString().withMessage("Kullanıcı adı string olmalı"),

  body("email")
    .optional()
    .isEmail().withMessage("Geçerli bir email adresi giriniz"),

  handleValidationErrors,
];

export {
  updateUserValidation,
  deleteUserValidation,
  userInfoValidation,
};
