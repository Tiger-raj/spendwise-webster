const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const path = require("path");
const rootDirectory = path.resolve(__dirname, "..");
const bcrypt = require("bcrypt");

const saltRounds = 10;
// post signup
module.exports.postSignUp = async function postSignUp(req, res) {
  try {
    let dataObj = req.body;

    // Hash the password asynchronously
    const hashedPassword = await bcrypt.hash(dataObj.password, saltRounds);

    // Update the user object with the hashed password
    dataObj.password = hashedPassword;

    // Create user in the database using userModel
    let user = await userModel.create(dataObj);

    if (user) {
      return res.json({
        message: "User signed up",
        data: user,
      });
    } else {
      res.json({
        message: "Error while signing up",
      });
    }
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
};

// get login
module.exports.getLogin = function getLogin(req, res) {
  res.sendFile(path.join(rootDirectory, "public", "index.html"));
  console.log("login encountered");
};
// post login
module.exports.loginUser = async function loginUser(req, res) {
  try {
    let data = req.body;

    if (data.email) {
      let user = await userModel.findOne({ email: data.email });

      if (user) {
        let passwordMatch = await bcrypt.compare(data.password, user.password);

        if (passwordMatch) {
          let uid = user["_id"];
          let token = jwt.sign({ payload: uid }, process.env.JWT_KEY);

          res.cookie("login", token, { httpOnly: true });
          return res.json({
            message: "User has logged in",
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
};

// isAuthorised -> to check user's role (admin or user)
module.exports.isAuthorised = function isAuthorised(roles) {
  return function (req, res, next) {
    if (roles.includes(req.role) == true) {
      next();
    } else {
      res.status(401).json({
        message: "unathorised access",
      });
    }
  };
};

// protectRoute -> a middleware, it'll call the next function after suceessful operation and will modify or add some properties of req object
module.exports.protectRoute = async function protectRoute(req, res, next) {
  try {
    let token;
    if (req.cookies.login) {
      //   console.log(req.cookies);
      token = req.cookies.login;
      let payload = jwt.verify(token, process.env.JWT_KEY); // it'll return the payload object in which the uid is stored as value in key named payload
      if (payload) {
        const user = await userModel.findById(payload.payload);
        req.role = user.role;
        req.id = user.id;
        console.log(req.id);
        next();
        // return res.json({
        //   message: "user verified'",
        // });
      } else {
        return res.json({
          message: "user not verified",
        });
      }
    } else {
      return res.json({
        message: "Login Again",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};
