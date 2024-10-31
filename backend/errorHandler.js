class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(err?.statusCode ?? 500).json({
    message: err.message,
  });
};

module.exports = { CustomError, errorHandler };
