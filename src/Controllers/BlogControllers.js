const AuthorModel = require("../Models/authorModel.js");
const BlogsModel = require("../Models/BlogsModel.js");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

// In this API we are creating Blog by taking data from the Author
// If author forget to enter some mandatory things are reminding Author by giving appropriate msg


//this function is use to make sure that required field starts with albhabates only
function validate(data){
    let re = /^[a-zA-Z]/;
    return re.test(data)
    }

    //validator function is used to check wheather required field present or not in specified format
const Validator = function (value) {
    if (!validate(value))return false;
    if (typeof value === "undefined" || value === null ) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};




const createBlog = async function (req, res) {
    try {
        const data = req.body
        if (!Validator(data.title)) return res.status(400).send({ message: "Please Enter the title which should starts with alphabates" })
        if (!Validator(data.body)) return res.status(400).send({ message: "Please write something in the body which should start with alphabate" })
        if (!Validator(data.category)) return res.status(400).send({ message: "Please enter the category which should start with alphabate" })
        //we used following function to check whether the authorId is valid mongoDB id
        if (!mongoose.Types.ObjectId.isValid(data.authorId)) return res.status(400).send({ message: "Please enter Valid authorId" })
        const id = data.authorId
        const author = await AuthorModel.findOne({ _id: id })
        if (!author) return res.status(404).send({ status: false, message: "Author is not present" })
        if (data.isPublished === true) {
            data.publishedAt = new Date()
            const myBlog = await BlogsModel.create(data)
           return res.status(201).send({ status: true, Data: myBlog })
        }
        const myBlog = await BlogsModel.create(data)
        return res.status(201).send({ status: true, Data: myBlog })
    } catch (err) { return res.status(500).send(err.message) }
}

//This API is for the fetching all the blogs with some filters,user will get all the present blog if no filter is applied
const getBlogs = async function (req, res) {
    try {
        let data = req.query
        let allBlogs = await BlogsModel.find({ $and: [data, { isPublished: true }, { isDeleted: false }] })
        if (allBlogs.length > 0) return res.status(200).send({ status: true, data: allBlogs })
        return res.status(404).send({ status: false, message: "No Blogs Found" })
    } catch (err) { return res.status(500).send(err.message) }
}

//in this API we understood how to push element inside the array present in the database
const updateBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId;
        let data = req.body
        let tag = data.tags
        let subcategory = data.subcategory
        let title = data.title
        let body = data.body
        const updatedblog = await BlogsModel.findOneAndUpdate({ _id: blogId }, { title: title, body: body, isPublished: true, publishedAt: new Date() }, { new: true },)
        if (!updatedblog) return res.status(404).send({ status: false, msg: "No such blog present" })
        if (data.subcategory) {
            updatedblog.subcategory.push(subcategory)
        }
        if(data.tags){
            updatedblog.tags.push(tag)
        }
        updatedblog.save()//this is to save the changes we have made from line no 69 to 74
        res.status(200).send({ msg: true, data: updatedblog })
    } catch (err) { res.status(500).send({ error: err.message }) }
}


//In this API we are simply deleting the blogs which id is present in the request
const deleteByParams = async function (req, res) {
    try {
        let blogId = req.params.blogId
        let blog = await BlogsModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { deletedAt: new Date(), isDeleted: true })
       if (!blog) return res.status(404).send({ status: false, message: "Blog is not present" })
        return res.status(200).send(" ")
    } catch (err) { return res.status(500).send(err.message) }
}

//in this API we are not using middleware to authorize, we have written the authorization inside the API only
//In this API we are decoding the token and taking authorId from that token the we are adding this authorId in data in order to delete the blogs which satisfy all the given filter by user ,here user is deleting only those blogs which user have created
const deleteByQuery = async function (req, res) {
    try {
        let data = req.query;
        if(!data) return res.status(400).send({msg:"Request is not valid"})
        data.isDeleted = false;
        let token = req.headers["x-api-key"]
         let decodedToken = jwt.decode(token)
        if(!decodedToken) return res.status(400).send({status:false,msg:"Invalid Token"})
        let Authors = await BlogsModel.find(data).select({ authorId: 1, _id: 0 })
        if (Authors.length == 0) return res.status(404).send({ status: false, message: "No Such Blog present" })
        data.authorId = decodedToken.authorId.toString()
             await BlogsModel.updateMany(data, { $set:{isDeleted: true, isDeletedAt: new Date()} })
            return res.status(200).send("")//since its a deleting request we are not sending beck any msg to the user we are just sending the status code so that user will understand the opertation is successful
        
    } catch (err) {
        // if(err.message==Invalide)
        return res.status(500).send(err.message) }
}



module.exports.createBlog = createBlog
module.exports.deleteByQuery = deleteByQuery
module.exports.deleteByParams = deleteByParams
module.exports.updateBlog = updateBlog
module.exports.getBlogs = getBlogs



