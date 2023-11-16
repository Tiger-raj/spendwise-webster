const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt"); // we'll use it later to improve security of login system

// database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(function (db) {
    console.log("db connected");
  })
  .catch(function (err) {
    console.log(err);
  });

// schema - signup
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  // confirmPassword: {
  //   type: String,
  //   required: true,
  //   minLength: 8,
  //   validate: function () {
  //     return this.password == this.confirmPassword;
  //   },
  // },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  profileImage: {
    type: String, // we'll use multer for this purpose
    default: "img/users/default.jpeg",
  },
});

// using a pre hook on userSchema so that we can avoid saving confirmPassword to the db (cuz it's a redundant data)
// userSchema.pre("save", function () {
//   this.confirmPassword = undefined;
// });

// models - to use schema made above
const userModel = mongoose.model("userModel", userSchema); // first parameter is name of model and second is the schema which is used to built this model

module.exports = userModel;
