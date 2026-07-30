const { body } = require("express-validator");

const createChildValidator = [
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
  body("gender")
    .trim()
    .toUpperCase()
    .isIn(["MALE", "FEMALE"])
    .withMessage("Gender must be Male or Female"),
  body("dateOfBirth")
    .isISO8601()
    .withMessage("A valid date of birth is required")
    .toDate(),
  body("weightAtBirth")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Weight must be a positive number"),
  body("parentId")
    .notEmpty()
    .withMessage("A parent must be specified")
    .isMongoId()
    .withMessage("parentId must be a valid Mongo ID"),
];

const updateChildValidator = [
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
  body("gender")
    .optional()
    .trim()
    .toUpperCase()
    .isIn(["MALE", "FEMALE"])
    .withMessage("Gender must be Male or Female"),
  body("dateOfBirth")
    .optional()
    .isISO8601()
    .withMessage("A valid date of birth is required")
    .toDate(),
  body("weightAtBirth")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Weight must be a positive number"),
];

module.exports = { createChildValidator, updateChildValidator };
