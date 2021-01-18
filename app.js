const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimiter');

const app = express();
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { ENV_PORT, MONGO_URL_DB, MONGO_OPTIONS } = require('./constants/config');
const finalError = require('./middlewares/finalError');

const hosts = [
  'http://localhost:3000',
  'https://new-gavrik.students.nomoreparties.xyz',
  'http://new-gavrik.students.nomoreparties.xyz',
  'https://api.new-gavrik.students.nomoreparties.xyz',
  'http://api.new-gavrik.students.nomoreparties.xyz',
];

app.use(cors({ origin: hosts }));

mongoose.connect(MONGO_URL_DB, MONGO_OPTIONS);

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(finalError);

app.listen(ENV_PORT);
