const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/userModel");
const path = require("path");
const rootDirectory = path.resolve(__dirname, "..");

// serving static files
authRouter.use(express.static(path.join(rootDirectory, "public")));

// auth router
//signup route
authRouter.route("/signup").post(postSignUp);
//login routes
authRouter.route("/login").get(getLogin).post(loginUser);

async function postSignUp(req, res) {
  try {
    let dataObj = req.body;

    // creating user in database using userModel
    let user = await userModel.create(dataObj);

    res.json({
      message: "user signed up",
      data: user,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle validation errors
      res.status(400).json({
        message: "Invalid input. Please check your data.",
        error: error.message,
      });
    } else {
      // Handle other unexpected errors
      console.error(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
}

function getLogin(req, res) {
  res.sendFile(path.join(rootDirectory, "public", "index.html"));
  console.log("login encountered");
}

async function loginUser(req, res) {
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({ email: data.email });
      if (user) {
        // implement bcrypt's compare function to make it more safe
        if (user.password == data.password) {
          res.cookie("isLoggedIn", true, { httpOnly: true });
          return res.json({
            message: "login success",
            userDetails: data,
          });
        } else {
          return res.status(401).json({
            message: "Wrong Credentials!!",
          });
        }
      } else {
        return res.status(401).json({
          message: "User not found",
        });
      }
    } else {
      return res.status(401).json({
        message: "Empty field found!!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = authRouter;
