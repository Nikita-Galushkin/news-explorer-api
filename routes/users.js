const router = require('express').Router();
const { getUserMe } = require('../controllers/users');

router.get('/users/me', getUserMe);

module.exports = router;
