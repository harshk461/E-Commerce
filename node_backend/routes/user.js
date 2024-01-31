const express = require('express');
const router = express.Router();
const { registerUser, loginUser, forgotPassword, resetPassword, getUserByID, deleteUser, addToCart } = require('../controller/user.controller');

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").put(resetPassword)
router.route("/get-user/:id").get(getUserByID);
router.route("/delete-user/:id").delete(deleteUser);
router.route("/add-to-cart/:product_id/:user_id/:q").put(addToCart);
module.exports = router;
