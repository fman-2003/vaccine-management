const express = require("express");
const router = express.Router();

const {
  createSchedule,
  getSchedules,
  getSchedulesByChild,
  updateSchedule,
  deleteSchedule,
  getDailySummary,
} = require("../controllers/scheduleController");
const {
  createScheduleValidator,
  updateScheduleValidator,
} = require("../validators/scheduleValidator");
const { validateMongoIdParam } = require("../validators/commonValidators");
const handleValidationErrors = require("../middleware/handleValidationErrors");
const { verifyToken } = require("../jwt/token");

router.use(verifyToken);

router.get("/summary/daily", getDailySummary);
router.get(
  "/child/:childId",
  validateMongoIdParam("childId"),
  handleValidationErrors,
  getSchedulesByChild,
);

router.post(
  "/",
  createScheduleValidator,
  handleValidationErrors,
  createSchedule,
);
router.get("/", getSchedules);
router.put(
  "/:id",
  validateMongoIdParam("id"),
  updateScheduleValidator,
  handleValidationErrors,
  updateSchedule,
);
router.delete(
  "/:id",
  validateMongoIdParam("id"),
  handleValidationErrors,
  deleteSchedule,
);

module.exports = router;
