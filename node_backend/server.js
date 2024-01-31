require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { use } = require('./routes/user');
const connectDB = require('./utils/connectDB');

// Create an instance of the express app
const app = express();

//connect DB
connectDB();

// Set up the middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use("/auth", use);

// Start the server
app.listen(3002, () => {
    console.log('Server started on port 3002');
});