const AppError = require('../utils/appError');

const handleCastError22P02 = () => {
  return new AppError(
    'Some type of data send does not macth was expected',
    400
  );
};

const handleJWTexpError = () =>{
  new AppError('Your token has expired! Please login again',401)
}

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err: err,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('Error', err);
    res.status(500).json({
      status: 'fail',
      message: 'something went very wrong',
    });
  }
};

exports.globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }
  if (process.env.NODE_ENV === 'production') {
    let error = err;

    

    if (error.parent?.code === '22P02') error = handleCastError22P02();

    if(error.name === 'TokenExpiredError') error = handleJWTexpError()

    sendErrorProd(error, res);
  }
};
