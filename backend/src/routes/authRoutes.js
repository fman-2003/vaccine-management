const express = require("express");
const { signup, login, logout, checkAuth } = require("../controllers/authController");

const router = express.Router();
const {
  signupValidator,
  loginValidator,
} = require("../validators/authValidator");
const handleValidationErrors = require("../middleware/handleValidationErrors");
const { verifyToken } = require("../jwt/token");

router.post("/signup", signupValidator, handleValidationErrors, signup);
router.post("/login", loginValidator, handleValidationErrors, login);
router.post("/logout", logout);
router.get("/me", verifyToken, checkAuth)

module.exports = router;
