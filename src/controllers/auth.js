const jwt = require("jsonwebtoken");
const isTokenPresent = function (req, res, next) {
 try{
   let token = req.headers["x-auth-token"];
  if (!token) {
     res.status(400).send({ status: false, msg: "token must be present" });
  }
  else {
    next()
  }
 }
 catch(err){
  res.status(500).send(err.message)
 }

}

const isTokenValid = function (req, res, next) {
  try {
    let token = req.headers["x-auth-token"]
    let decodedToken = jwt.verify(token, "Snehal-fn-rad-37QCI");
    if(decodedToken){
      next()
    }
    else{
      res.status(400).send("invalid token")
    }
  }
  catch (err) {
    res.status(500).send(err.message)
  }
}


const isAuthorised = async function (req, res, next) {
  try {
    let userId = req.params.userId
    let token = req.headers["x-auth-token"]
    let decodedToken = jwt.verify(token, "Snehal-fn-rad-37QCI")
    if (userId == decodedToken.userId) {
      next()
    }
    else{
      res.status(403).send("you are not authorised")
    }
  } catch (err) {
    res.status(500).send()
  }

}

const isUserIdValid = async function (req, res, next) {
  try{
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.send("No such user exists");
  }
  else {
    next()
  }}
  catch(err){
    res.status(500).send(err.message)
  }
}

module.exports.isUserIdValid = isUserIdValid
module.exports.isAuthorised = isAuthorised
module.exports.isTokenPresent = isTokenPresent
module.exports.isTokenValid = isTokenValid
