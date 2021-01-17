const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const articlesRouter = require('./articles');
const usersRouter = require('./users');
const auth = require('../middlewares/auth');
const { validateUser, validateLogin } = require('../middlewares/requestValidation');
const { NOT_FOUND_ERROR } = require('../constants/constants');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', validateLogin, login);
router.post('/signup', validateUser, createUser);

router.use('/', auth, usersRouter);
router.use('/', auth, articlesRouter);
router.use('*', auth, () => {
  throw new NotFoundError({ message: NOT_FOUND_ERROR });
});

module.exports = router;
