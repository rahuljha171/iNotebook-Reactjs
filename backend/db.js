const mongoose = require('mongoose');
const mongoUri =process.env.REACT_APP_MONGODB_URI;
const connectToMongo = ()=>{
    mongoose.connect(mongoUri,()=>{
        console.log("connect to mongoDb successful");


    })
}
module.exports = connectToMongo;
