const User = require("../models/User");
const { generateToken, setTokenCookie } = require("../jwt/token");
const {
  isDuplicateKeyError,
  getDuplicateKeyField,
} = require("../util/duplicateKeyError");

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.create({ username, email, password });
    const token = generateToken(user._id);

    res.status(201).json({ message: "New user created successfully" });
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      return res.status(409).json({
        message: `${getDuplicateKeyField(error)} is already in use`,
      });
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = generateToken(user._id);
    setTokenCookie(res, token);

    res
      .status(200)
      .json({ data: user, token: token, message: "Login successful" });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

const checkAuth = async (req, res) => {
  try {
    res.status(200).json({ authenticated: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signup, login, logout, checkAuth };
