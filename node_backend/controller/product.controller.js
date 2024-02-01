const Product = require('../models/product.model');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorHandler = require('../utils/errHandler');

exports.GetAllProduct = asyncHandler(
    async (req, res, next) => {
        const produts = await Product.find();

        return res.json(produts);
    }
)

exports.GetByCategory = asyncHandler(
    async (req, res, next) => {
        const category = req.params.category;

        const products = await Product.find({ category: category });

        if (!products) {
            return next(new ErrorHandler("Invalid Category", 400));
        }

        return res.json(products);
    }
)


exports.GetProductByID = asyncHandler(
    async (req, res, next) => {
        const id = req.params.id;

        const product = await Product.findById(id);

        if (!product) {
            return next(new ErrorHandler("Invalid Product ID", 400));
        }

        return res.json(product);
    }
)