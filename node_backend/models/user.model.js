const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Please enter your username'],
        maxLength: [30, 'Username cant exceed 30 character length'],
        minLength: [3, 'Username should have atleast 3 character length']
    },
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Name cant exceed 30 character length'],
        minLength: [3, 'Name should have atleast 3 character length']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [8, 'Password should be atleast 8 character long'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    cart: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            }
        }
    ],
    addresses: [
        {
            name: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
            pincode: {
                type: Number,
                required: true,
            },
            phone: {
                type: Number,
                required: true,
            },
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

//on save event
userSchema.pre("save", async function (next) {

    if (!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


userSchema.methods.getResetPassword = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model("user", userSchema);