import { body } from "express-validator";

export const commonEmailValidation = body("email")
  .isEmail()
  .withMessage("Please provide a valid email address")
  .matches(/^[\w.-]{3,}@[\w.-]+\.[a-zA-Z]{2,}$/)
  .withMessage("Email username must be at least 3 characters");

export const passwordValidation = body("password")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters")
  .matches(/[A-Z]/)
  .withMessage("Must contain uppercase");

export const userSignupValidator = [commonEmailValidation, passwordValidation];

export const adminCreateValidator = [
  commonEmailValidation, 
];
