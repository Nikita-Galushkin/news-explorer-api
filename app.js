require('dotenv').config();
const express = require('express');
// const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimiter');

const app = express();
const articlesRouter = require('./routes/articles');
const usersRouter = require('./routes/users');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateUser, validateLogin } = require('./middlewares/requestValidation');
const NotFoundError = require('./errors/NotFoundError.js');
const { MONGO_OPTIONS } = require('./constants/config');
const { NOT_FOUND_ERROR, CRASH_TEST_ERROR } = require('./constants/constants');

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/newsdb',
} = process.env;

const hosts = [
  'http://localhost:3000',
  'https://new.gavrik.students.nomoreparties.xyz',
  'http://new.gavrik.students.nomoreparties.xyz',
  'https://api.new.gavrik.students.nomoreparties.xyz',
  'http://api.new.gavrik.students.nomoreparties.xyz',
];

app.use(cors({ origin: hosts }));
// app.use(cookieParser());

mongoose.connect(MONGO_URL, MONGO_OPTIONS);

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(CRASH_TEST_ERROR);
  }, 0);
});

app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);

app.use('/', auth, usersRouter);
app.use('/', auth, articlesRouter);
app.use('*', auth, () => {
  throw new NotFoundError(NOT_FOUND_ERROR);
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
    return;
  }
  res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
  next();
});

app.listen(PORT);
