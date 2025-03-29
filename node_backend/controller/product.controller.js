const Product = require('../models/product.model');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorHandler = require('../utils/errHandler');

exports.GetAllProduct = asyncHandler(async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const type = req.query.type;
        const skip = (page - 1) * limit;

        const filter = type ? { category: type } : {};

        const products = await Product.find(filter).skip(skip).limit(limit);


        res.status(200).json({ success: true, data: products });
    } catch (error) {
        next(error);
    }
});

exports.GetAllProductCount = asyncHandler(async (req, res, next) => {
    try {
        const count = await Product.countDocuments();
        res.status(200).json({ success: true, count });
    } catch (error) {
        next(error);
    }
});


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

exports.GetProductReviews = asyncHandler(
    async (req, res, next) => {
        const id = req.params.id;

        const product = await Product.findById(id);

        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404));
        }

        return res.json(product.reviews);
    }
)

exports.AddProductReview = asyncHandler(
    async (req, res, next) => {
        const product_id = req.params.id;

        const product = await Product.findById(product_id);

        const { rating, comment } = req.body;

        if (!product) {
            return next("Product Not Found", 404);
        }

        const data = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment: comment,
        }

        //append review to reviews

        product.reviews.push(data);
        product.numOfReviews = product.reviews.length;

        let avgRating = 0;

        product.reviews.forEach(item => {
            avgRating += item.rating;
        })

        product.ratings = avgRating / product.reviews.length;

        await product.save({ validateBeforeSave: false });

        return res.json({
            status: "success",
        });
    }
)


exports.UpdateReview = asyncHandler(
    async (req, res, next) => {
        const product_id = req.params.id;
        const { comment, rating, review_id } = req.body;

        const product = await Product.findById(product_id);

        if (!product) {
            return next(new ErrorHandler("Product Not found", 404));
        }

        const existingReview = product.reviews.find(item => item.id === review_id && item.user.toString() === req.user.id);

        if (!existingReview) {
            return next(new ErrorHandler("Review Doesn't exists", 400));
        }

        existingReview.rating = rating;
        existingReview.comment = comment;

        let avgRating = 0;

        product.reviews.forEach(item => {
            avgRating += item.rating;
        })

        product.ratings = avgRating / product.reviews.length;

        await product.save({ validateBeforeSave: false });

        return res.json({
            status: "success",
        });

        return res.json(product);
    }
)

exports.DeleteReview = asyncHandler(
    async (req, res, next) => {
        const product_id = req.params.id;
        const review_id = req.params.review_id;

        const product = await Product.findById(product_id);

        if (!product) {
            return next(new ErrorHandler("Product Not found", 404));
        }

        const existingReviewIndex = product.reviews.findIndex(
            (item) => item.id.toString() === review_id && item.user.toString() === req.user.id.toString()
        );

        if (existingReviewIndex === -1) {
            return next(new ErrorHandler("Review Not found", 404));
        }

        product.reviews.splice(existingReviewIndex, 1);

        product.numOfReviews = product.reviews.length;

        if (product.reviews.length > 0) {
            let avgRating = 0;

            product.reviews.forEach((item) => {
                avgRating += item.rating;
            });

            product.ratings = avgRating / product.reviews.length;
        } else {
            product.ratings = 0;
        }

        await product.save({ validateBeforeSave: false });

        return res.json({
            status: "success",
        });
    }
);
