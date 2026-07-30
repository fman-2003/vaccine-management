// MongoDB signals a unique-index violation with error code 11000. Naming
// this check makes call sites self-explanatory instead of a bare magic
// number scattered across every controller that has a unique field.

function isDuplicateKeyError(error) {
  return error.code === 11000;
}

function getDuplicateKeyField(error) {
  return Object.keys(error.keyPattern)[0];
}

module.exports = { isDuplicateKeyError, getDuplicateKeyField };
