const express = require("express");
const router = express.Router();

const {
  createChild,
  getAllChildren,
  getChildById,
  updateChild,
  deleteChild,
} = require("../controllers/childController");
const {
  createChildValidator,
  updateChildValidator,
} = require("../validators/childValidator");
const { validateMongoIdParam } = require("../validators/commonValidators");
const handleValidationErrors = require("../middleware/handleValidationErrors");
const { verifyToken } = require("../jwt/token");

router.use(verifyToken);

router.post("/", createChildValidator, handleValidationErrors, createChild);
router.get("/", getAllChildren);
router.get(
  "/:id",
  validateMongoIdParam("id"),
  handleValidationErrors,
  getChildById,
);
router.put(
  "/:id",
  validateMongoIdParam("id"),
  updateChildValidator,
  handleValidationErrors,
  updateChild,
);
router.delete(
  "/:id",
  validateMongoIdParam("id"),
  handleValidationErrors,
  deleteChild,
);

module.exports = router;
