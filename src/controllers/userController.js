const jwt = require("jsonwebtoken");
const express = require("express");
const axios = require("axios");
const userModel = require("../models/userModel");

const myState = async (req,res)=>{
  const options = {
    method: "get",
    url : "https://cdn-api.co-vin.in/api/v2/admin/location/states"
  }
  const result = await axios( options )
  console.log(result.data)
  res.send(result.data)
}
const myState = async (req,res)=>{
  const options = {
    method: "get",
    url : "https://cdn-api.co-vin.in/api/v2/admin/location/states"
  }
  const result = await axios( options )
  console.log(result.data)
  res.send(result.data)
}





const createUser = async function (req, res) {
  try {
    let data = req.body
    if (Object.keys(data).lenght != 0) {
      if(!data.mobile){
        res.status(400).send({msg: "Moblie number required"})
      }
      let savedData = await userModel.create(data);
      res.status(201).send({ msg: savedData });
    }
    else {
      res.status(400).send("Bad Request")
    }
  }
  catch (err) {
    res.status(500).send(err.message)
  }
}

const loginUser = async function (req, res) {
  try {
    let userName = req.body.emailId;
    let password = req.body.password;
    if (!(userName && password)) {
      res.status(400).send("Please enter userName or Password")
    }

    let user = await userModel.findOne({ emailId: userName, password: password });
    if (!user) {
      res.status(404).send({
        status: false,
        msg: "username or the password is not corerct",
      })

    }
    let token = jwt.sign(
      {
        userId: user._id.toString(),
        _batch: "Radon",
        organisation: "FunctionUp",
      },
      "Snehal-fn-rad-37QCI"
    );
    res.setHeader("x-auth-token", token);
    res.status(201).send({ status: true, token: token });
  }
  catch (err) {
    res.status(500).send(err.message)
  }
};

const getUserData = async function (req, res) {
  try {
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails) {
      res.status(404).send({ status: false, msg: "No such user exists" });
    }
    res.status(200).send({ status: true, data: userDetails });
  }
  catch (err) {
    res.status(500).send(err.message)
  }
}

const updateUser = async function (req, res) {
  try{
  let userId = req.params.userId;
  let user = await userModel.findById(userId);

  // if (!user) {
  //    res.status(404).send("No such user exists");
  // }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
  res.status(200).send({ status: true, data: updatedUser });
}
catch(err){
  res.status(500).send(err.message)
}
}
const deleteUser = async function (req, res) {
  try{
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user) {
    res.status(400).send("No such user exists");
  }
  
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { isDeleted: true });
  res.status(200).send({ status: true, data: updatedUser })
}
catch(err){
  res.status(500).send(err.message)
}
}

module.exports.myState = myState
module.exports.createUser = createUser
module.exports.getUserData = getUserData
module.exports.updateUser = updateUser
module.exports.deleteUser = deleteUser
module.exports.loginUser = loginUser
