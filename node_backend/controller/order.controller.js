const asyncHandler = require('../middleware/asyncHandler');
const ErrorHandler = require('../utils/errHandler');
const Order = require('../models/order.model');
const mongoose = require('mongoose');
const promo = require('../utils/promo');

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

exports.CheckPromoCode = asyncHandler(
    async (req, res, next) => {
        const promo_code = req.params.promo;

        const isExist = promo.find(item => item.code.toLocaleLowerCase() === promo_code.toLocaleLowerCase());

        if (isExist) {
            return res.status(200).json({ discount: isExist.discountPercent });
        }

        return next(new ErrorHandler("Invalid Promo Code", 404));
    }
);

exports.CreateNewOrder = asyncHandler(
    async (req, res, next) => {
        const {
            shippingInfo: {
                address,
                city,
                state,
                country,
                pinCode,
                phoneNumber
            },
            orderItems,
            paymentInfo: { id, status },
            paidAt,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body;

        const mappedOrderItems = orderItems.map((item) => {
            return { ...item, product: new mongoose.Types.ObjectId(item.product) };
        });

        console.log(mappedOrderItems);

        const user = req.user._id;
        const newOrder = new Order({
            shippingInfo: {
                address,
                city,
                state,
                country,
                pinCode,
                phoneNumber
            },
            orderItems: mappedOrderItems, // Use the corrected mappedOrderItems
            user,
            paymentInfo: {
                id,
                status
            },
            paidAt,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const savedOrder = await newOrder.save();

        res.status(201).json(savedOrder);
    }
);
