const mongoose = require('mongoose');
const mongoUri = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
const connectToMongo = ()=>{
    mongoose.connect(mongoUri,()=>{
        console.log("connect to mongoDb successful");


    })
}
module.exports = connectToMongo;