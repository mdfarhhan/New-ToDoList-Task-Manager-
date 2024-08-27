const mongoose = require("mongoose");
const {MONGODB} = require("./index")

exports.connectDB = async()=>{
    await mongoose.connect(MONGODB);
    console.log("Database Connected...");
};