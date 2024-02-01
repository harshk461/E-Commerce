require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const user = require('./routes/user');
const product = require('./routes/product');
const orders = require('./routes/order');
const connectDB = require('./utils/connectDB');
const cors = require('cors');

// Create an instance of the express app
const app = express();

//connect DB
connectDB();

// Set up the middleware
app.use(cors({
    origin: '*'
}));
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

//routes
app.get("/", (req, res) => {
    return res.json({ 'sd': 'sdj' });
})
app.use("/auth", user);
app.use("/product", product)
app.use("/order", orders)

// Start the server
app.listen(3002, () => {
    console.log('Server started on port 3002');
});