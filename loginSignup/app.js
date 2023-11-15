const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.listen(3000);
app.use(express.json()); // global middleware to convert json data to js object data so that we can work on them

app.use(cookieParser()); // we'll use cookies as middleware function so that we can access them from anywhere like in req, res objects

// mini app
const userRouter = require("./Routers/userRouter");

app.use("/user", userRouter); // base route of mini app is /user and the router to use is userRouter
