const router = require('express').Router()
const { registerUser, loginUser } = require('../controller/user.controller');
const User = require('../models/user.model');

//routes
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router