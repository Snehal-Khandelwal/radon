const jwt = require("jsonwebtoken");
const isTokenPresent = function (req,res,next){
    let token = req.headers["x-auth-token"];
    console.log(token)
    if (!token)  {
        return res.send({ status: false, msg: "token must be present" });
    } 
    else{
              next()
    }

  //If no token is present in the request header return error
  //if token is present in the request it will let next program to execute
}

const isTokenValid = function (req,res,next){
    let token = req.headers["x-auth-token"]
    let decodedToken = jwt.verify(token, "Snehal-fn-rad-37QCI");
    console.log({decode:decodedToken})
  if (!decodedToken){
      
      return res.send({ status: false, msg: "token is invalid" });
  }
  else{
    next()
  }
//if token is not valid it will give error msg
//if token is valid in the request it will let next program to execute
}

const isUserIdValid = async function (req,res,next){
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    //Return an error if no user with the given id exists in the db
    if (!user) {
      return res.send("No such user exists");
    }
    else{
        next()
    }
}

module.exports.isTokenPresent = isTokenPresent
module.exports.isTokenValid = isTokenValid
