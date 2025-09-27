import { body } from "express-validator";
import { handleValidationErrors } from "#validations";
import { User } from '#models'

const registerValidation = [
  body("globalName").optional().isString().withMessage("Global name geçersiz"),

  body("username")
    .notEmpty().withMessage("Kullanıcı adı boş olamaz")
    .isLength({ min: 3, max: 11 }).withMessage("Kullanıcı adı en az 3, maksimum 11 karakter olmalı")
    .custom(async (value) => {
      const existingUser = await User.findOne({ username: value });
      if (existingUser) {
        throw new Error("Kullanıcı adı zaten kullanılıyor");
      }
      return true;
  }),

  body("email")
    .notEmpty().withMessage("Email boş olamaz")
    .isEmail().withMessage("Geçerli bir email giriniz")
    .custom(async (value) => {
      const existingUser = await User.findOne({ email: value });
      if (existingUser) {
		return false
      }
      return true;
  }),

  body("phone")
    .optional()
    .isMobilePhone("tr-TR").withMessage("Geçerli bir telefon numarası giriniz")
    .custom(async (value) => {
      if (!value) return true;
      const existingUser = await User.findOne({ phone: value });
      if (existingUser) {
        throw new Error("Telefon numarası zaten kullanılıyor");
      }
      return true;
  }),

  body("password")
    .notEmpty().withMessage("Parola boş olamaz")
    .isLength({ min: 6 }).withMessage("Parola en az 6 karakter olmalı"),

  body("role")
    .optional()
    .isIn(["admin", "customer"]).withMessage("Role 'admin' veya 'customer' olmalı"),

  handleValidationErrors,
];

const loginValidation = [
  body("email")
    .optional()
    .isEmail()
	.withMessage("Geçerli bir email adresi giriniz."),

  body("username")
    .optional()
    .isAlphanumeric()
	.withMessage("Kullanıcı adı sadece harf ve rakamlardan oluşmalıdır."),

  body().custom((value, { req }) => {
    if (!req.body.email && !req.body.username) {
      throw new Error("Email veya kullanıcı adı zorunludur.");
    }
    return true;
  }),

  body("password")
    .notEmpty().withMessage("Parola boş olamaz."),

  handleValidationErrors,
];

const authRouteRefreshAcessTokenValidation = [
  body("token").notEmpty().withMessage("Token gerekli"),

  body().custom((value, { req }) => {
    if (!req.body.token) {
      throw new Error("token zorunludur.");
    }
    return true;
  }),

  handleValidationErrors,
];

export {
	registerValidation,
	loginValidation,
	authRouteRefreshAcessTokenValidation
}
