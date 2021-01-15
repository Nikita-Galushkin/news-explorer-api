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

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUserMe = (req, res, next) => {
  const userId = mongoose.Types.ObjectId(req.user._id);
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_USER_ERROR);
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
    throw new UnauthorizedError(REQUEST_ERROR);
  }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(CONFLICT_USER_ERROR);
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
    throw new UnauthorizedError(LOGIN_ERROR);
  }
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(LOGIN_ERROR);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(LOGIN_ERROR);
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' },
          );
          return res.status(200).send({ token });
          // res
        //   .cookie('jwt', token, {
        //     maxAge: 3600000 * 24 * 7,
        //     httpOnly: true,
        //     sameSite: true,
        //   })
        //   .send({ message: 'Успешная авторизация' });
        });
    })
    .catch(next);
};
