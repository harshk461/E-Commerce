const router = require('express').Router();
const { GetAllProduct, GetByCategory, GetProductByID, GetProductReviews, AddProductReview, UpdateReview, DeleteReview, GetAllProductCount } = require('../controller/product.controller');
const { isAuthenticated } = require('../middleware/auth');


router.route("/get-all").get(GetAllProduct);
router.route("/count").get(GetAllProductCount);
router.route("/get-single/:id").get(GetProductByID);
router.route("/get-reviews/:id").get(GetProductReviews);
router.route("/add-review/:id").put(isAuthenticated, AddProductReview);
router.route("/update-review/:id").put(isAuthenticated, UpdateReview);
router.route("/delete-review/:id/:review_id").put(isAuthenticated, DeleteReview);
module.exports = router;