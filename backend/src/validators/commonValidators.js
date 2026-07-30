const { param } = require("express-validator");

// Reused across every GET/PUT/DELETE /:id route so a malformed ID gets
// caught before it ever reaches Mongoose (which would otherwise throw a
// less friendly CastError deep inside the controller)
const validateMongoIdParam = (paramName = "id") => [
  param(paramName)
    .isMongoId()
    .withMessage(`${paramName} must be a valid Mongo ID`),
];

module.exports = { validateMongoIdParam };
