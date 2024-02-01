const router = require('express').Router();
const { GetAllProduct, GetByCategory, GetProductByID } = require('../controller/product.controller');

router.route("/get-all").get(GetAllProduct);
router.route("/get/:category").get(GetByCategory);
router.route("/get-single/:id").get(GetProductByID);

module.exports = router;