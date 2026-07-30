const User = require('../models/User');
const {generateToken} = require('../jwt/token');
const { isDuplicateKeyError, getDuplicateKeyField } = require('../util/duplicateKeyError');

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

    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = generateToken(user._id);

    res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login };
