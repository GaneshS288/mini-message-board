function errorHandler(err, req, res, next) {
  console.log(err.message);
  res.send(err.message);
}

export default errorHandler;
