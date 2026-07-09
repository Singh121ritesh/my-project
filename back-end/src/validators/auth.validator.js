import { body, validationResult } from "express-validator";

export const registerValidator = [
  body("username")
    .exists({ checkFalsy: true })
    .withMessage("username is required")
    .isString()
    .withMessage("username must be a string")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("username must be between 3 and 30 characters"),

  body("email")
    .exists({ checkFalsy: true })
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be a valid email"),

  body("password")
    .exists({ checkFalsy: true })
    .withMessage("password is required")
    .isString()
    .withMessage("password must be a string")
    .isLength({ min: 6, max: 100 })
    .withMessage("password must be at least 6 characters"),

  // Final handler: send 400 if validation fails
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    return next();
  },
];

export const loginValidator = [
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be a valid email")
    .normalizeEmail(),

  body("password")
    .exists({ checkFalsy: true })
    .withMessage("password is required")
    .isString()
    .withMessage("password must be a string")
    .isLength({ min: 6, max: 100 })
    .withMessage("password must be at least 6 characters"),

  // Final Handler
  (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: result.array(),
      });
    }

    next();
  },
];