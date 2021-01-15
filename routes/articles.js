const router = require('express').Router();
const { validateArticle, validateId } = require('../middlewares/requestValidation');
const {
  getArticles, createArticle, deleteArticle,
} = require('../controllers/articles');

router.get('/articles', getArticles);
router.post('/articles', validateArticle, createArticle);
router.delete('/articles/:_id', validateId, deleteArticle);

module.exports = router;
