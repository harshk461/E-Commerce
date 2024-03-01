const ErrorHandler = require('../utils/errHandler');
const asyncHandler = require("./asyncHandler");
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.isAuthenticated = asyncHandler(
    async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(new ErrorHandler("Login First to access this", 400));
        }
        const token = authHeader.split(' ')[1];

        try {
            const decodedToken = jwt.verify(token, process.env.secretKey);
            req.user = await User.findById(decodedToken.id);
            next();
        } catch (error) {
            return next(new ErrorHandler("Invalid Token", 401));
        }
    }
);
