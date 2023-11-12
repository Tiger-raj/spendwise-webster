const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/userModel");
const protectRoute = require("./authHelper");

userRouter
  .route("/") // when the route is same as specified above i.e. /user, so we'r using / here
  .get(protectRoute, getUsers) // it'll at first call the middleware function protectRoute, which will allow user to get the list of users only if the user is logged in
  .patch(protectRoute, updateUser)
  .delete(protectRoute, deleteUser);

// cookies
userRouter.route("/getCookies").get(getCookies);
userRouter.route("/setCookies").get(setCookies);

userRouter.route("/:mail").get(getUserByMail);

async function getUsers(req, res) {
  let allUsers = await userModel.find();
  res.json({
    message: "list of all users",
    data: allUsers,
  });
}

async function updateUser(req, res) {
  // console.log(req.body);
  let mail = req.body.email;
  let dataToBeUpdated = req.body;
  let user = await userModel.findOneAndUpdate({ email: mail }, dataToBeUpdated);
  res.json({
    message: "data updated successfully",
    data: user,
  });
}

async function deleteUser(req, res) {
  let dataToBeDeleted = req.body;
  let user = await userModel.findOneAndDelete(dataToBeDeleted);
  res.json({
    message: "data has been deleted",
    data: user,
  });
}

async function getUserByMail(req, res) {
  // console.log(req.params);
  let mail = req.params.mail;
  let user = await userModel.findOne({ email: mail });
  res.json({
    message: "list of all users",
    data: user,
  });
}

function setCookies(req, res) {
  res.cookie("isLoggedIn", true, { maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly: true }); // the parameters in {} are options, maxAge defines the age of cookies i.e. 24hrs here, secure true means the cookies can only be accessed by https protocol and not by http, httpOnly means cookies are not accessible from frontend and hence frontend cannot modify it, which is good for security purpose
  res.cookie("isPrimeMember", true);

  res.send("cookies set");
}

function getCookies(req, res) {
  let cookies = req.cookies;
  console.log(cookies);
  res.send("cookies received");
}

module.exports = userRouter;
