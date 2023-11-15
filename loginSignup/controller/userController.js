const userModel = require("../models/userModel");

module.exports.getUser = async function getUser(req, res) {
  try {
    let id = req.id;
    let user = await userModel.findById(id);
    if (user) {
      res.json({
        message: "user found",
        data: user,
      });
    } else {
      res.json({
        message: "user not found!",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.updateUser = async function updateUser(req, res) {
  try {
    let id = req.params.id;
    let dataToBeUpdated = req.body;
    if (Object.keys(dataToBeUpdated).length === 0) {
      return res.json({
        message: "No data provided for update.",
      });
    }
    let updatedData = await userModel.findByIdAndUpdate(id, dataToBeUpdated, { new: true });
    if (updatedData) {
      return res.json({
        message: "user data updated!",
        data: updatedData,
      });
    } else {
      return res.json({
        message: "user not found, please enter correct id!",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.deleteUser = async function deleteUser(req, res) {
  try {
    let id = req.params.id;
    let user = await userModel.findByIdAndDelete(id);
    if (!user) {
      res.json({
        message: "user not found!",
      });
    }
    res.json({
      message: "data has been deleted",
      data: user,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.getAllUser = async function getAllUser(req, res) {
  try {
    let users = await userModel.find();
    if (users) {
      res.json({
        message: "users retrieved",
        data: users,
      });
    } else {
      res.json({
        message: "users not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
