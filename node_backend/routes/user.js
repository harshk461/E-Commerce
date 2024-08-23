const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserByID,
  deleteUser,
  addToCart,
  removeFromCart,
  getCartDetails,
  AddNewAddress,
  GetAllAddress,
  RemoveAddress,
} = require("../controller/user.controller");
const { isAuthenticated } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").put(resetPassword);
router.route("/get-user").get(isAuthenticated, getUserByID);
router.route("/delete-user/:id").delete(isAuthenticated, deleteUser);
router.route("/get-cart").get(isAuthenticated, getCartDetails);
router.route("/add-to-cart").put(isAuthenticated, addToCart);
router
  .route("/remove-from-cart/:product_id/")
  .put(isAuthenticated, removeFromCart);
router.route("/add-address").put(isAuthenticated, AddNewAddress);
router.route("/get-address").get(isAuthenticated, GetAllAddress);
router
  .route("/remove-address/:address_id")
  .patch(isAuthenticated, RemoveAddress);
module.exports = router;
