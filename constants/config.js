require('dotenv').config();

const {
  JWT_SECRET, NODE_ENV, PORT, MONGO_URL,
} = process.env;

const ENV_PORT = PORT || 3000;
const JWT_KEY_SECRET = (NODE_ENV === 'production') ? JWT_SECRET : 'dev-secret';
const MONGO_URL_DB = MONGO_URL || 'mongodb://localhost:27017/newsdb';
const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

module.exports = {
  ENV_PORT,
  JWT_KEY_SECRET,
  MONGO_URL_DB,
  MONGO_OPTIONS,
};
