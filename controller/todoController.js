const TODO_SCHEMA = require("../model/todoModel");

const asyncHandler = require("express-async-handler");

exports.addToDo = asyncHandler(async(req,res)=>{
    let {title,description,status} = req.body;
    // console.log(req)
    // console.log(req.myUser);
    let newTodo = await TODO_SCHEMA.create({
        title,
        description,
        status,
        createdBy:req.myUser._id,
    });
    res.status(201).json({success:true,message:"Task Created",newTodo});
});

exports.fetchAllToDo = asyncHandler(async(req,res)=>{
    let todo = await TODO_SCHEMA.find({});
    if(todo.length==0){
        throw new Error("No todo Found");
    }
    res.status(200).json({success:true,message:"all todo fetched",todo});
});

exports.fetchOneToDo = asyncHandler(async(req,res)=>{
    let todo = await TODO_SCHEMA.findById(req.params.id);
    if(!todo){
        throw new Error("no todo found");
    }
    res.status(200).json({success:true,message:"todo Fetched",todo});
});

exports.updateToDo = asyncHandler(async(req,res)=>{
    let findtodo = await TODO_SCHEMA.findById(req.params.id);
    if(!findtodo){
        throw new Error("no todo found");
    }
    let updateTodo = await TODO_SCHEMA.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json({success:true,message:"todo Updated successfully",updateTodo})
});

exports.deleteToDo = asyncHandler(async(req,res)=>{
    let findtodo = await TODO_SCHEMA.findById(req.params.id);
    if(!findtodo){
        throw new Error("no todo found");
    }
    let deleteTodo = await TODO_SCHEMA.findByIdAndDelete(req.params.id);
    res.status(200).json({success:true,message:"todo Deleted successfully",deleteTodo})
});