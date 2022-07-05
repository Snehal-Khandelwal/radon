const jwt = require("jsonwebtoken");
const BlogsModel = require("../models/blogsModel.js");


//===========Authentication=====================//
const isTokenValid = function (req, res, next) {
    try{
    let token = req.headers["x-api-key"]
    if(!token) return res.status(400).send("token is not present")

    let decodedToken =  jwt.verify(token, "Project-1-Blogging-site")
    // if (!decodedToken)   return res.status(400).send({ status: false, msg: "token is invalid" });
    req.tokenId = decodedToken.authorId

        next()
    
}catch (err) {
    if( err.message=="invalid signature") return res.status(400).send({status: false , msg: "token is invalid"})
    if( err.message=="invalid token") return res.status(400).send({status: false , msg: "token is invalid"})
    return res.status(500).send(err.message)
}}


//============Authorisation============//
const isAuthorised = async function (req, res, next) {
    try{
    let requiredBlog = await BlogsModel.findById(req.params.blogId)
    if(!requiredBlog)  return res.status(404).send({status:false , msg:"No such blog"})


    let authorId = requiredBlog.authorId
    // let token = req.headers["x-api-key"]
    // let decodedToken = jwt.verify(token, "Project-1-Blogging-site")
    // console.log(decodedToken)
    tokenId = req.tokenId
    if (authorId != tokenId) return res.status(403).send({status:false , msg:"you are not authorized to take this action"})
    
      next()

    }catch (err) {
        return res.status(500).send(err.message)
    }
}



module.exports = {isTokenValid,isAuthorised}