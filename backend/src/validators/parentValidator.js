const { body } = require("express-validator");

const createParentValidator = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("First name must be between 2 and 100 characters"),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Last name must be between 2 and 100 characters"),
  body("title").trim().notEmpty().withMessage("Parental role is required"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("A valid email is required")
    .normalizeEmail(),
  body("phoneNumber").trim().notEmpty().withMessage("Phone number is required"),
  body("dateOfBirth")
    .isISO8601()
    .withMessage("A valid date of birth is required")
    .toDate(),
  body("hospitalNumber").optional().trim(),
  body("nhis").optional().trim(),
];

const updateParentValidator = [
  body("firstName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("First name cannot be empty")
    .isLength({ min: 2, max: 100 })
    .withMessage("First name must be between 2 and 100 characters"),
  body("lastName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Last name cannot be empty")
    .isLength({ min: 2, max: 100 })
    .withMessage("Last name must be between 2 and 100 characters"),
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Parental role cannot be empty"),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("A valid email is required")
    .normalizeEmail(),
  body("phoneNumber")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Phone number cannot be empty"),
  body("dateOfBirth")
    .optional()
    .isISO8601()
    .withMessage("A valid date of birth is required")
    .toDate(),
  body("hospitalNumber").optional().trim(),
  body("nhis").optional().trim(),
];

module.exports = { createParentValidator, updateParentValidator };
