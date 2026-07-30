const { body } = require("express-validator");

const createVaccineValidator = [
  body("type").trim().notEmpty().withMessage("Vaccine type is required"),
  body("minimumTargetAge")
    .trim()
    .notEmpty()
    .withMessage("Minimum target age is required"),
  body("dosage").trim().notEmpty().withMessage("Dosage is required"),
  body("routeOfAdministration")
    .trim()
    .notEmpty()
    .withMessage("Route of administration is required"),
  body("siteOfAdministration")
    .trim()
    .notEmpty()
    .withMessage("Site of administration is required"),
];

const updateVaccineValidator = [
  body("type")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Vaccine type cannot be empty"),
  body("minimumTargetAge")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Minimum target age cannot be empty"),
  body("dosage")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Dosage cannot be empty"),
  body("routeOfAdministration")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Route of administration cannot be empty"),
  body("siteOfAdministration")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Site of administration cannot be empty"),
];

module.exports = { createVaccineValidator, updateVaccineValidator };
