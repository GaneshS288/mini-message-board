function errorHandler(err, req, res, _next) {
  console.log(err.message);
  res.send(err.message);
}

export default errorHandler;
