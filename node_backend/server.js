require('dotenv').config()

const express = require('express');
const PORT = process.env.PORT || 3002;
const bodyParser = require('body-parser');
const path = require('path');
const user = require('./routes/user');
const product = require('./routes/product');
const orders = require('./routes/order');
const connectDB = require('./utils/connectDB');
const cors = require('cors');
const errHandlerMiddleWare = require('./middleware/err');
const ErrorHandler = require('./utils/errHandler');

// Create an instance of the express app
const app = express();

//connect DB
connectDB();

// Set up the middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

//routes
app.use("/auth", user);
app.use("/product", product)
app.use("/order", orders)

app.use(errHandlerMiddleWare)

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});