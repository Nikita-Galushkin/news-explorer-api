const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  REQUEST_ERROR, LOGIN_ERROR, NOT_FOUND_USER_ERROR, CONFLICT_USER_ERROR,
} = require('../constants/constants');
const { JWT_KEY_SECRET } = require('../constants/config');

module.exports.getUserMe = (req, res, next) => {
  const userId = mongoose.Types.ObjectId(req.user._id);
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ message: NOT_FOUND_USER_ERROR });
      }
      return res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  if (!email || !password || !name) {
    throw new UnauthorizedError({ message: REQUEST_ERROR });
  }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError({ message: CONFLICT_USER_ERROR });
      }
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name, email, password: hash,
        })
          .then((data) => {
            res.send({
              name: data.name,
              _id: data._id,
              email: data.email,
            });
          })
          .catch(next))
        .catch(next);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!password || !email) {
    throw new UnauthorizedError({ message: LOGIN_ERROR });
  }
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError({ message: LOGIN_ERROR });
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError({ message: LOGIN_ERROR });
          }
          const token = jwt.sign(
            { _id: user._id },
            JWT_KEY_SECRET,
            { expiresIn: '7d' },
          );
          return res.status(200).send({ token });
        });
    })
    .catch(next);
};
