const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { UNAUTHORIZED } = require('../constants/constants');
const { JWT_KEY_SECRET } = require('../constants/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new UnauthorizedError({ message: UNAUTHORIZED });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_KEY_SECRET);
  } catch (err) {
    throw new UnauthorizedError({ message: UNAUTHORIZED });
  }
  req.user = payload;
  next();
};
