const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/index")
exports.genToken = (id)=>{
    return jwt.sign({id}, JWT_SECRET,{
        expiresIn:"3d",
    });
};