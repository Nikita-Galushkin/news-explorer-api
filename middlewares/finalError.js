const finalError = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
    return;
  }
  res.status(500).send({ message: err.message });
  next();
};

module.exports = finalError;
