const ErrorHandler = require('../utils/errHandler');
const asyncHandler = require("./asyncHandler");
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.isAuthenticated = asyncHandler(
    async (req, res, next) => {
        const token = req.headers.authorization;

        if (!token) {
            return next(new ErrorHandler("Login First to access this", 400));
        }

        const decodedToken = jwt.verify(token, process.env.secretKey);

        req.user = await User.findById(decodedToken.id);

        next();
    }
)
