const Article = require('../models/article');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  REQUEST_ERROR, FORBIDEN_ARTICLE_ERROR, NOT_FOUND_ARTICLE_ERROR, REMOVE_MESSAGE,
} = require('../constants/constants');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((data) => res.send(data))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  if (!keyword || !title || !text || !date || !source || !link || !image) {
    throw new BadRequestError(REQUEST_ERROR);
  }
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => {
      res.send({
        _id: article._id,
        keyword: article.keyword,
        title: article.title,
        text: article.text,
        date: article.date,
        source: article.source,
        link: article.link,
        image: article.image,
      });
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params._id).select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError(NOT_FOUND_ARTICLE_ERROR);
      }
      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError(FORBIDEN_ARTICLE_ERROR);
      }
      return Article.findByIdAndRemove(req.params._id)
        .then(() => {
          res.send(REMOVE_MESSAGE);
        })
        .catch(next);
    })
    .catch(next);
};
