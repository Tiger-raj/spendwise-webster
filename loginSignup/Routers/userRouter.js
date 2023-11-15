const express = require("express");
const userRouter = express.Router();
const { getUser, getAllUser, updateUser, deleteUser } = require("../controller/userController");
const { getLogin, postSignUp, loginUser, isAuthorised, protectRoute } = require("../controller/authController");
const path = require("path");
const rootDirectory = path.resolve(__dirname, "..");

// serving static files
userRouter.use(express.static(path.join(rootDirectory, "public")));

// signup
userRouter.route("/signup").post(postSignUp);
// login
userRouter.route("/login").get(getLogin).post(loginUser);

// user options
userRouter.use(protectRoute); // checking if user is logged in or not

userRouter.route("/:id").patch(updateUser).delete(deleteUser);

userRouter.route("/userProfile").get(getUser);
// admin specific func
userRouter.use(isAuthorised(["admin"]));
userRouter.route("").get(getAllUser);

module.exports = userRouter;
