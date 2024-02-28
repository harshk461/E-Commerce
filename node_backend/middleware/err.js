const ErrorHandler = require('../utils/errHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // handling wrong mongodb id err
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //mongoose duplicate error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    //wrong jwt err
    if (err.code === 'JsonWebTokenError') {
        const message = `JsonWebToken is invalid, try again`;
        err = new ErrorHandler(message, 400);
    }

    //jwt expire err
    if (err.code === 'TokenExpiredError') {
        const message = `JsonWebToken is expired, try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        statuscode: err.statusCode,
        message: err.message
    });
};