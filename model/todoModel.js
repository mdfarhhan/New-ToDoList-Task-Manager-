const mongoose = require("mongoose");



const todoSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,

        },
        status:{
            type:String,
            enum:["pending","ongoing","completed"],
            default:"pending"

        },
        dueDate:{
            type:Date,
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    }, { timestamps: true });

module.exports = mongoose.model("Todo",todoSchema);