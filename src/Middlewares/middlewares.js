const jwt = require("jsonwebtoken");
const BlogsModel = require("../Models/BlogsModel.js");


//this function is for the purpose for the authentication
const isTokenValid = function (req, res, next) {
    try{
    let token = req.headers["x-api-key"]
    if(!token) return res.status(400).send("token is not present")
    let decodedToken = jwt.decode(token)
    if (!decodedToken) {
        return res.status(400).send({ status: false, msg: "token is invalid" });
    }
    else {
        next()
    }
}catch (err) {
    return res.status(500).send(err.message)
}}


//this token is for the purpose of authorisation
const isAuthorised = async function (req, res, next) {
    try{
    BlogId = req.params.blogId;
    let requiredBlog = await BlogsModel.findById(BlogId)
    if(!requiredBlog){
        return res.status(404).send("No such blog ")
    }
    let authorId = requiredBlog.authorId
    let token = req.headers["x-api-key"]
    let decodedToken = jwt.decode(token)
    console.log(decodedToken)
    if (authorId == decodedToken.authorId) {
        next()
    }
    else {
        return res.status(403).send("you are not authorized to take this action")//403 for forbiden request
    }}catch (err) {
        return res.status(500).send(err.message)
    }
}

//  const auth = async function (req,res,next){
//     try{
//     let data = req.query
//     let token = req.headers["x-api-key"]
//     let decodedToken = jwt.decode(token)
//     let Authors = await BlogsModel.find(data).select({authorId:1,_id:0})
//     let reqAuthorId = decodedToken.authorId
//     for(let author of Authors){
//     if (AuthorId == decodedToken.authorId) {
//         next()
//     } return res.send("you are not authorized to take this action")
//     }}catch (err) {
//         return res.status(500).send(err.message)
//     }
//  }




module.exports.isTokenValid = isTokenValid
module.exports.isAuthorised = isAuthorised