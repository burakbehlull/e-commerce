import { body } from "express-validator";
import { handleValidationErrors } from "#validations";

const loginValidation = [
  body("email")
    .optional()
    .isEmail().withMessage("Geçerli bir email adresi giriniz."),

  body("username")
    .optional()
    .isAlphanumeric().withMessage("Kullanıcı adı sadece harf ve rakamlardan oluşmalıdır."),

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

export default loginValidation
