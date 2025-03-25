function errorHandler(err, req, res, _next) {
  console.log(err.message);
  res.status(err.status || 400).render("400", { message: err.message });
}

export default errorHandler;
