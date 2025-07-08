import { body } from "express-validator";

export const feedbackValidator = [
  body("mentorRating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Mentor rating must be between 1 and 5"),

  body("menteeRating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Mentee rating must be between 1 and 5"),

  body("mentorComment").optional().isLength({ max: 100 }),
  
  body("menteeComment").optional().isLength({ max: 100 }),
];
