const express = require("express");
const router = express.Router();

const {
  createVaccine,
  getAllVaccines,
  getVaccineById,
  updateVaccine,
  deleteVaccine,
} = require("../controllers/vaccineController");
const {
  createVaccineValidator,
  updateVaccineValidator,
} = require("../validators/vaccineValidator");
const { validateMongoIdParam } = require("../validators/commonValidators");
const handleValidationErrors = require("../middleware/handleValidationErrors");
const { verifyToken } = require("../jwt/token");

router.use(verifyToken);

router.post("/", createVaccineValidator, handleValidationErrors, createVaccine);
router.get("/", getAllVaccines);
router.get(
  "/:id",
  validateMongoIdParam("id"),
  handleValidationErrors,
  getVaccineById,
);
router.put(
  "/:id",
  validateMongoIdParam("id"),
  updateVaccineValidator,
  handleValidationErrors,
  updateVaccine,
);
router.delete(
  "/:id",
  validateMongoIdParam("id"),
  handleValidationErrors,
  deleteVaccine,
);

module.exports = router;
