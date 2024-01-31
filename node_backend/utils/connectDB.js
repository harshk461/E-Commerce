const mongoose = require('mongoose');
// mongoose.set('strictQuery', false);

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(res => {
            console.log("Database connected");
        })
        .catch((e) => console.log(e.message))
}

module.exports = connectDB;