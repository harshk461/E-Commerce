const mongoose = require('mongoose');
// mongoose.set('strictQuery', false);

const connectDB = () => {
    mongoose.connect(process.env.MONOGO_URI, {
        useNewUrlParser: true, useUnifiedTopology: true
    }).then((data) => {
        console.log(`MongoDb connected with server: ${data.connection.host}`);
    });
}

module.exports = connectDB;