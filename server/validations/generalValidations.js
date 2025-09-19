import { body } from "express-validator";
import { handleValidationErrors } from "#validations";

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
	authRouteRefreshAcessTokenValidation
}
