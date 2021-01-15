const { celebrate, Joi, CelebrateError } = require('celebrate');
const validator = require('validator');

const urlValidation = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError({ message: 'Некорректный адрес' });
  }
  return value;
};

const validateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2)
      .messages({
        'string.min': 'Минимальная длина поля "keyword" - 2',
        'any.required': 'Поле "keyword" должно быть заполнено',
      }),
    title: Joi.string().required().min(2)
      .messages({
        'string.min': 'Минимальная длина поля "title" - 2',
        'any.required': 'Поле "title" должно быть заполнено',
      }),
    text: Joi.string().required().min(2)
      .messages({
        'string.min': 'Минимальная длина поля "text" - 2',
        'any.required': 'Поле "text" должно быть заполнено',
      }),
    date: Joi.string().required().min(2)
      .messages({
        'string.min': 'Минимальная длина поля "date" - 2',
        'any.required': 'Поле "date" должно быть заполнено',
      }),
    source: Joi.string().required().min(2)
      .messages({
        'string.min': 'Минимальная длина поля "source" - 2',
        'any.required': 'Поле "source" должно быть заполнено',
      }),
    link: Joi.string().required().custom(urlValidation)
      .messages({
        'any.required': 'Поле "link" должно быть заполнено',
      }),
    image: Joi.string().required().custom(urlValidation)
      .messages({
        'any.required': 'Поле "image" должно быть заполнено',
      }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'any.required': 'Поле "name" должно быть заполнено',
      }),
    email: Joi.string().required().email()
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.min': 'Минимальная длина поля "password" - 8',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.min': 'Минимальная длина поля "password" - 8',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
  }),
});

module.exports = {
  validateArticle,
  validateId,
  validateUser,
  validateLogin,
};
