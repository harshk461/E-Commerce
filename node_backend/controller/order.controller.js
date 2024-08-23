const asyncHandler = require("../middleware/asyncHandler");
const ErrorHandler = require("../utils/errHandler");
const Order = require("../models/order.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const promo = require("../utils/promo");

exports.GetUserOrders = asyncHandler(async (req, res, next) => {
  const user_id = req.user._id;
  //   console.log(user_id);
  const orders = await Order.find({ user: user_id });

  if (!orders) {
    return next(new ErrorHandler("Invalid User", 400));
  }

  //   console.log(orders);
  return res.json(orders);
});

exports.GetOrderByID = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const order = await Order.findById(id);

  if (!order) {
    return next(new ErrorHandler("Invalid Order ID", 400));
  }

  return res.json(order);
});

exports.CheckPromoCode = asyncHandler(async (req, res, next) => {
  const promo_code = req.params.promo;

  const isExist = promo.find(
    (item) => item.code.toLocaleLowerCase() === promo_code.toLocaleLowerCase()
  );

  if (isExist) {
    return res.status(200).json({ discount: isExist.discountPercent });
  }

  return next(new ErrorHandler("Invalid Promo Code", 404));
});

exports.CreateNewOrder = asyncHandler(async (req, res, next) => {
  const {
    shippingInfo: { address, city, state, country, pincode, phone },
    orderItems,
    paymentInfo: { id, status },
    paidAt,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  // Map orderItems to ensure product IDs are in ObjectId format
  const mappedOrderItems = orderItems.map((item) => ({
    ...item,
    product: new mongoose.Types.ObjectId(item.product),
  }));

  // Get the user ID from the request
  const user = req.user._id;

  try {
    // Save the new order
    const newOrder = new Order({
      shippingInfo: {
        address,
        city,
        state,
        country,
        pinCode: pincode,
        phoneNumber: phone,
      },
      orderItems: mappedOrderItems,
      user,
      paymentInfo: {
        id,
        status,
      },
      paidAt,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const savedOrder = await newOrder.save();

    // Empty the user's cart
    await User.findByIdAndUpdate(user, { $set: { cart: [] } });

    res.status(201).json(savedOrder);
  } catch (error) {
    // Handle any errors that occur
    console.error("Error in CreateNewOrder:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
