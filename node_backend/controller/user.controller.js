const asyncHandler = require('../middleware/asyncHandler')
const User = require('../models/user.model');
const Product = require('../models/product.model');
const crypto = require('crypto');
const { createToken } = require('../utils/createToken');
const ErrorHandler = require('../utils/errHandler');

exports.registerUser = asyncHandler(
    async (req, res, next) => {
        const { username, name, email, password } = req.body;

        const user = await User.create({
            username, name, email, password,
            avatar: {
                public_id: 'sample publicid',
                url: 'sample pic'
            }
        });

        return res.json({
            status: "success"
        })
    }
);
exports.loginUser = asyncHandler(
    async (req, res, next) => {
        const { username, password } = req.body;

        const user = await User.findOne({ username }).select("+password")

        if (!user) {
            return next(new ErrorHandler("Invalid User", 401))
        }

        const passwordMatch = await user.comparePassword(password);

        if (!passwordMatch) {
            return next(new ErrorHandler("Incorrect Password", 401))
        }

        const data = {
            username: user.username,
            id: user._id,
            email: user.email,
        };

        const token = createToken(data);

        return res.json({ status: "success", token: token });
    }
)

exports.forgotPassword = asyncHandler(
    async (req, res, next) => {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        const resetToken = user.getResetPassword();

        await user.save({ validateBeforeSave: true });

        const resetUrl = process.env.FRONTEND_URI + "/auth/reset-password/" + resetToken;

        //mail sending part

        //assuming mail is sent
        return res.json({
            status: "success",
            message: `Reset Token sent to ${user.email}`,
            token: resetToken
        });

    }
)

exports.resetPassword = asyncHandler(
    async (req, res, next) => {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { "$gt": Date.now() } });

        if (!user) {
            return next(new ErrorHandler("Invalid Reset Token or Token Expired", 400));
        }

        if (req.body.password !== req.body.confirmpassword) {
            return next(new ErrorHandler("Password Doesn't match", 400));
        }

        user.password = req.body.password;
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;

        await user.save();

        return res.json({
            status: 'success',
            message: "Password Changed"
        })
    }
)

exports.getUserByID = asyncHandler(
    async (req, res, next) => {
        const user_id = req.params.id;

        const user = await User.findOne({ _id: user_id });

        if (!user) {
            return next(new ErrorHandler("Invalid User", 404));
        }

        return res.json(user);
    }
)

exports.updatePassword = asyncHandler(
    async (req, res, next) => {
        const user = await User.findById({ _id: req.params.id }).select("+password");

        const oldPasswordMatch = user.comparePassword(req.body.oldPassword);

        if (!oldPasswordMatch) {
            return next(new ErrorHandler("Old Password Does not match", 400));
        }

        if (req.body.password !== req.body.confirmpassword) {
            return next(new ErrorHandler("Password Does not match", 400));
        }

        user.password = req.body.password;

        await user.save();
    }
)

exports.deleteUser = asyncHandler(
    async (req, res, next) => {

        const user = await User.findById(req.params.id);

        if (!user) {
            return next(new ErrorHandler("User Does not exists", 404));
        }

        await User.deleteOne({ _id: req.params.id });

        res.status(200).json({
            success: true,
            message: 'User deleted Successfully'
        });
    }
);

exports.addToCart = asyncHandler(async (req, res, next) => {
    const productId = req.params.product_id;
    const user_id = req.params.user_id;
    const quantity = parseInt(req.params.q);

    const user = await User.findById(user_id);

    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    if (quantity > product.stock) {
        return next(new ErrorHandler("Quantity is greater than available stock", 400));
    }

    if (!user) {
        return next(new ErrorHandler("Invalid User", 404));
    }

    const existingProductInCart = user.cart.find((item) => item.productId.toString() === productId);

    if (existingProductInCart) {
        // Increment the quantity of the existing item
        existingProductInCart.quantity += quantity;
    } else {
        // Create a Mongoose model instance for the cart item
        const data = {
            productId: productId,
            quantity: quantity
        }

        // Push the model instance into the cart array
        user.cart.push(data);
    }

    await user.save();

    res.status(200).json({
        success: true,
        message: 'Product added to cart successfully',
    });
});


exports.removeFromCart = asyncHandler(
    async (req, res, next) => {
        const user_id = req.params.user_id;
        const product_id = req.params.product_id;

        const user = await User.findById(user_id);

        if (!user) {
            return next(new ErrorHandler("Invalid User", 404));
        }

        const productIndex = user.cart.findIndex(item => item.productId.toString() === product_id);

        if (productIndex === -1) {
            return next(new ErrorHandler("Product not available in cart", 404));
        }

        user.cart.splice(productIndex, 1);

        await user.save();

        return res.json({
            message: "Deleted Successfully",
        });
    }
)