const { body } = require("express-validator");

const signupValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Username must be between 3 and 100 characters"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("A valid email is required")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character"),
];

const loginValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Username must be between 3 and 100 characters"),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = { signupValidator, loginValidator };
