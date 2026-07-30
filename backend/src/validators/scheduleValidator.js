const { body } = require("express-validator");

const createScheduleValidator = [
  body("child")
    .notEmpty()
    .withMessage("A child must be specified")
    .isMongoId()
    .withMessage("child must be a valid Mongo ID"),
  body("vaccine")
    .notEmpty()
    .withMessage("A vaccine must be specified")
    .isMongoId()
    .withMessage("vaccine must be a valid Mongo ID"),
  body("earliestDate")
    .isISO8601()
    .withMessage("A valid earliest date is required")
    .toDate(),
];

const updateScheduleValidator = [
  body("status")
    .optional()
    .isIn(["pending", "completed", "missed"])
    .withMessage("Status must be pending, completed, or missed"),
  body("dateOfImmunization")
    .optional()
    .isISO8601()
    .withMessage("A valid date of immunization is required")
    .toDate()
    .custom((value, { req }) => {
      if (req.body.status === "completed" && !value) {
        throw new Error(
          "dateOfImmunization is required when marking a schedule as completed",
        );
      }
      return true;
    }),
  body("comment").optional().trim(),
];

module.exports = { createScheduleValidator, updateScheduleValidator };
