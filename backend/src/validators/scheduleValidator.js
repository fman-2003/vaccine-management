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
  // required at creation now — this is what a new entry gets grouped
  // into a "daily" schedule tab by
  body("dateOfImmunization")
    .isISO8601()
    .withMessage("A valid date of immunization is required")
    .toDate(),
  body("comment").optional().trim(),
];

const updateScheduleValidator = [
  // child/vaccine can be reassigned on an existing entry via the edit
  // form; dateOfImmunization deliberately has no such allowance below —
  // it's immutable once the entry is created
  body("child")
    .optional()
    .isMongoId()
    .withMessage("child must be a valid Mongo ID"),
  body("vaccine")
    .optional()
    .isMongoId()
    .withMessage("vaccine must be a valid Mongo ID"),
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
