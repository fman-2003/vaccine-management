const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Rate limit exceeded. Try again in 15 minutes.",
    });
  },
});

module.exports = limiter