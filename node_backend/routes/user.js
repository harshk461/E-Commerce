const express = require('express');
const router = express.Router();
const { registerUser, loginUser, forgotPassword, resetPassword, getUserByID, deleteUser, addToCart, removeFromCart } = require('../controller/user.controller');
const { isAuthenticated } = require('../middleware/auth');

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").put(resetPassword)
router.route("/get-user").get(isAuthenticated, getUserByID);
router.route("/delete-user/:id").delete(isAuthenticated, deleteUser);
router.route("/add-to-cart/:product_id/:user_id/:q").put(isAuthenticated, addToCart);
router.route("/remove-from-cart/:product_id/:user_id").put(removeFromCart);

module.exports = router;
