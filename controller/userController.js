const USER_SCHEMA = require("../model/userModel")

const asyncHandler = require("express-async-handler");
const { genToken } = require("../utills/myToken");
const { token } = require("morgan");

exports.registerUser = asyncHandler(async (req, res) => {
    let { username, email, password, role } = req.body;
    let findUser = await USER_SCHEMA.findOne({ email });
    if (findUser) {
        throw new Error("user with these gmail address is already Exist");
    }

    let newUser = await USER_SCHEMA.create({ email, username, password, role });
    res.status(201).json({ success: true, message: "user registered Successfully", newUser })
});

exports.fetchAllUser = asyncHandler(async (req, res) => {
    let fUsers = await USER_SCHEMA.find({});
    if (fUsers.length == 0) {
        throw new Error("No user Found");
    }

    res.status(200).json({ success: true, message: "All Users found Successfully", fUsers })
});

exports.fetchOneUser = asyncHandler(async (req, res) => {
    let user = await USER_SCHEMA.findById(req.params.id);
    if (!user) {
        throw new Error("no such user Found");
    }
    res.status(200).json({ success: true, message: "User Fetched Successfully", user })
});

exports.updateUser = asyncHandler(async (req, res) => {
    let fUser = await USER_SCHEMA.findById(req.params.id);
    if (!fUser) {
        throw new Error("no user found");
    }

    let updateUser = await USER_SCHEMA.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    res.status(200).json({ success: true, message: "user Updated", updateUser });
});

exports.deleteUser = asyncHandler(async (req, res) => {
    let user = await USER_SCHEMA.findById(req.params.id);
    if (!user) {
        throw new Error("no user found");
    }
    let deleteUser = await USER_SCHEMA.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "user deleted sucessfully", deleteUser });
});

exports.login = asyncHandler(async (req, res) => {
    let { email, password } = req.body;
    let findUser = await USER_SCHEMA.findOne({ email });

    if (!findUser) {
        throw new Error("no user found");
    }

    let isMatchPass = await findUser.matchPassword(password);
    if (!isMatchPass) {
        throw new Error("wrong Password");
    }

    let token = genToken(findUser._id);
    res.cookie("myCookie", token, {
        httpOnly: true
    });
    res.status(200).json({ success: true, message: "login Successfully", token });
})

exports.logout = asyncHandler(async (req, res) => {
    res.clearCookie("myCookie","",{expireIn:0});
    res.status(200).json({success:true,message:"user logged out"})
})