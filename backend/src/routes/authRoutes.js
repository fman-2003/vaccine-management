const express = require("express");
const { signup, login } = require("../controllers/authController");

const router = express.Router();
const {
  signupValidator,
  loginValidator,
} = require("../validators/authValidator");
const handleValidationErrors = require("../middleware/handleValidationErrors");

router.post("/signup", signupValidator, handleValidationErrors, signup);
router.post("/login", loginValidator, handleValidationErrors, login);

module.exports = router;
