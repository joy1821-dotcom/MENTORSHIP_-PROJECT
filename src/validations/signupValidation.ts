// validators/signupValidator.ts
import { body } from "express-validator";

export const signupValidator = [
  body("email")
  .isEmail()
  .withMessage("Please provide a valid email address")
  .matches(/^[\w.-]{3,}@[\w.-]+\.[a-zA-Z]{2,}$/)
  .withMessage("Email username must be at least 3 characters"),

  body("password")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters")
  .matches(/[a-z]/)
  .withMessage("Password must contain at least one lowercase letter")
  .matches(/[A-Z]/)
  .withMessage("Password must contain at least one uppercase letter")
  .matches(/[!@#$%^&*(),.?":{}|<>]/)
  .withMessage("Password must contain at least one special character"),

  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),

  body("role")
    .isIn(["mentor", "mentee"])
    .withMessage("Role must be one of: mentor, mentee"),
];
