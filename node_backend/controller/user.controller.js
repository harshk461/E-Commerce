const asyncHandler = require('../middleware/asyncHandler')
const User = require('../models/user.model');
const Product = require('../models/product.model');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { createToken } = require('../utils/createToken');
const ErrorHandler = require('../utils/errHandler');
const multer = require('multer');
const path = require('path');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({
    storage,
});

async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
        'resource_type': "auto",
        "folder": "ecommerce",
    })

    return res;
}

exports.registerUser = async (req, res, next) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return next(err); // Pass any multer errors to the error handler
        }

        const { username, name, email, password, image } = req.body;

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return next(new ErrorHandler("Username already exists", 401));
        }

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const imageUrl = (await handleUpload(dataURI)).secure_url;
        const user = await User.create({
            username, name, email, password,
            avatar: {
                public_id: 'sample publicid',
                url: imageUrl,
            }
        });

        return res.json({
            status: "success",
            user: user
        });
    });
};

exports.loginUser = asyncHandler(
    async (req, res, next) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return next(new ErrorHandler("Invalid User", 401))
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

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
        const user = await User.findOne({ _id: req.user.id });

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

exports.getCartDetails = asyncHandler(
    async (req, res, next) => {
        const user_id = req.user._id;
        const user = await User.findById(user_id);

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        const cart = user.cart;
        return res.status(200).json(cart);
    }
);

exports.addToCart = asyncHandler(async (req, res, next) => {
    const user_id = req.user._id;
    const user = await User.findById(user_id);

    const { productId, quantity, name, price, image } = req.body;

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
            name: name,
            price: price,
            image: image,
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
        const user_id = req.user._id
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

exports.GetAllAddress = asyncHandler(
    async (req, res, next) => {
        const user_id = req.user._id;

        const user = await User.findById(user_id);

        if (!user) {
            return next(new ErrorHandler("Invalid User", 404));
        }

        const addresses = user.addresses;

        return res.status(200).json(addresses);
    }
)

exports.AddNewAddress = asyncHandler(
    async (req, res, next) => {
        const user_id = req.user._id;

        const { name, address, city, state, country, pincode, phone } = req.body;

        const user = await User.findById(user_id);

        if (!user) {
            return next(new ErrorHandler("Invalid User", 404));
        }

        const newAddress = {
            name,
            address,
            city,
            state,
            country,
            pincode,
            phone
        };
        user.addresses.push(newAddress);

        await user.save();

        return res.status(200).json({ "message": "Added new Address" });
    }
)