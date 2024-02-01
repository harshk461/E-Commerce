const { GetUserOrders, GetOrderByID } = require('../controller/order.controller');

const router = require('express').Router();

router.route("/get/:user_id").get(GetUserOrders);
router.route("/get-single/:id").get(GetOrderByID);

module.exports = router;