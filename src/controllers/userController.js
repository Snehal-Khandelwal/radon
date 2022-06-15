const jwt = require("jsonwebtoken");
const express = require("express");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
   let data = req.body
  let savedData = await userModel.create(data);
  res.send({ msg: savedData });
}

const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  console.log(user)
  if (!user){
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    })
  };


  let token = jwt.sign(
    {
      userId: user._id.toString(),
      _batch: "Radon",
      organisation: "FunctionUp",
    },
    "Snehal-fn-rad-37QCI"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });
};

const getUserData = async function (req, res) {
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails){
    res.send({ status: false, msg: "No such user exists" });
  }
  res.send({ status: true, data: userDetails });
};

const updateUser = async function (req, res) {
  let userId = req.params.userId;
  let user = await userModel.findById(userId);

  if (!user) {
    return res.send("No such user exists");
  }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
  res.send({ status: true, data: updatedUser });
};

const deleteUser = async function (req, res) {

 let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user) {
    return res.send("No such user exists");
  }

  let updatedUser = await userModel.findOneAndUpdate({ _id: userId },{isDeleted:true});
  res.send({ status: true, data: updatedUser })

}
module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.loginUser = loginUser;
