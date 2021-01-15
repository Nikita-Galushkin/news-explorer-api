const rateLimit = require('express-rate-limit');

const {
  LIMIT_MINUTES = 15,
  LIMIT_QTY = 150,
} = process.env;

const limiter = rateLimit({
  windowMs: LIMIT_MINUTES * 60 * 1000,
  max: LIMIT_QTY,
});

module.exports = limiter;
