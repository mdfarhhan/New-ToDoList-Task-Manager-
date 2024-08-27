const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            minlength:6
        },
        role:{
            type:String,
            enum:["user","admin"],
            default:"user"
        }
    },
    { timestamps: true });


    userSchema.pre("save",async function(){
        let salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
    });

    userSchema.methods.matchPassword = async function(enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password)
    }

    module.exports = mongoose.model("User",userSchema);