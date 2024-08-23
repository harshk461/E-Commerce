const {
  GetUserOrders,
  GetOrderByID,
  CreateNewOrder,
  CheckPromoCode,
} = require("../controller/order.controller");
const { isAuthenticated } = require("../middleware/auth");
const router = require("express").Router();

router.route("/get/").get(isAuthenticated, GetUserOrders);
router.route("/get-single/:id").get(isAuthenticated, GetOrderByID);
router.route("/check-promo/:promo").get(CheckPromoCode);
router.route("/new-order").post(isAuthenticated, CreateNewOrder);

module.exports = router;
