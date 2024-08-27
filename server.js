const express = require('express');
const { connectDB } = require('./config/db');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { PORT } = require('./config');
const cors = require("cors")
const userRoute = require("./router/userRouter");
const todoRoute = require("./router/todoRouter")
const { error } = require('./middlewere/error');
const { protect } = require('./middlewere/auth');

connectDB();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/yes",userRoute);
app.use("/todo",protect,todoRoute);

app.use(error);


app.listen(PORT,(err)=>{
    if (err) throw err;
    console.log("Express server Running on Port No 9000")
});