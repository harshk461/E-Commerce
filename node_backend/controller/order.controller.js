const asyncHandler = require('../middleware/asyncHandler');
const ErrorHandler = require('../utils/errHandler');
const Order = require('../models/order.model');

exports.GetUserOrders = asyncHandler(
    async (req, res, next) => {
        const user_id = req.params.user_id;

        const orders = await Order.find({ user: user_id });

        if (!orders) {
            return next(new ErrorHandler("Invalid User", 400));
        }

        return res.json(orders)
    }
)

exports.GetOrderByID = asyncHandler(
    async (req, res, next) => {
        const id = req.params.id;

        const order = await Order.findById(id);

        if (!order) {
            return next(new ErrorHandler("Invalid Order ID", 400));
        }

        return res.json(order);
    }
)