const { celebrate, Joi, CelebrateError } = require('celebrate');
const validator = require('validator');
const { CELEBRATE_ERROR } = require('../constants/constants');

const urlValidation = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError({ message: CELEBRATE_ERROR });
  }
  return value;
};

const validateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2),
    title: Joi.string().required().min(2),
    text: Joi.string().required().min(2),
    date: Joi.string().required().min(2),
    source: Joi.string().required().min(2),
    link: Joi.string().required().custom(urlValidation),
    image: Joi.string().required().custom(urlValidation),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports = {
  validateArticle,
  validateId,
  validateUser,
  validateLogin,
};
