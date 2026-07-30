const express = require("express");
const router = express.Router();

const {
  createParent,
  getAllParents,
  getParentById,
  updateParent,
  deleteParent,
} = require("../controllers/parentController");
const {
  createParentValidator,
  updateParentValidator,
} = require("../validators/parentValidator");
const { validateMongoIdParam } = require("../validators/commonValidators");
const handleValidationErrors = require("../middleware/handleValidationErrors");
const { verifyToken } = require("../jwt/token");

router.use(verifyToken);

router.post("/", createParentValidator, handleValidationErrors, createParent);
router.get("/", getAllParents);
router.get(
  "/:id",
  validateMongoIdParam("id"),
  handleValidationErrors,
  getParentById,
);
router.put(
  "/:id",
  validateMongoIdParam("id"),
  updateParentValidator,
  handleValidationErrors,
  updateParent,
);
router.delete(
  "/:id",
  validateMongoIdParam("id"),
  handleValidationErrors,
  deleteParent,
);

module.exports = router;
