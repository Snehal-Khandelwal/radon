const AuthorModel = require("../models/authorModel.js");
const BlogsModel = require("../models/blogsModel.js");
const mongoose = require('mongoose');
const validator = require("./authorControllers.js")
const jwt = require("jsonwebtoken");


//=========body validation================//
const validator1 = function (value) {
    if (typeof value === "undefined" || value === null ) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};


//==============Blog Creattion===========//
const createBlog = async function (req, res) {
    try {
        let data = req.body
        if(!Object.keys(body.length == 0)) return res.status(400).send({status: false ,msg:"Please Enter valid details"})
        if (!validator(data.title)) return res.status(400).send({ msg: "Please Enter the title which should starts with alphabates" })
        if (!validator1(data.body)) return res.status(400).send({ msg: "Please write something in the body which should start with alphabate" })
        if (!validator1(data.category)) return res.status(400).send({ msg: "Please enter the category which should start with alphabate" })
        if (!mongoose.Types.ObjectId.isValid(data.authorId)) return res.status(400).send({ message: "Please enter Valid authorId" })
        const id = data.authorId
        const author = await AuthorModel.findById(id)
        if (!author) return res.status(404).send({ status: false, msg: "Author is not present" })
        if (data.isPublished == true) {
            data.publishedAt = new Date()
            const myBlog = await BlogsModel.create(data)
           return res.status(201).send({ status: true, Data: myBlog })
        }
        const myBlog = await BlogsModel.create(data)
        return res.status(201).send({ status: true, Data: myBlog })
    } catch (err) { return res.status(500).send({status:false ,msg:err.message}) }
}

// ==============get blogs by filer=============//
const getBlogs = async function (req, res) {
    try {
        let data = req.query
        let allBlogs = await BlogsModel.find({ $and: [data, { isPublished: true }, { isDeleted: false }] })
        if (allBlogs.length > 0) return res.status(200).send({ status: true, data: allBlogs })
        return res.status(404).send({ status: false, msg: "No Blogs Found" })
    } catch (err) { return res.status(500).send(err.message) }
}

//=======================BLog Updation=========================//
const updateBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId
        // let data = req.body
        // let tag = data.tags
        // let subcategory = data.subcategory
        // let title = data.title
        // let body = data.body
        // let isPublished = data.isPublished;
        const {title , body , tag , subcategory , isPublished } = req.body
        

        if(isPublished === true){
             let publishedAt = new Date();
             const updatedblog = await BlogsModel.findOneAndUpdate({ _id: blogId , isDeleted:false}, { title: title, body: body,isPublished:isPublished, publishedAt:publishedAt }, { new: true })
             if (!updatedblog) return res.status(404).send({ status: false, msg: "No such blog present" })
             if (data.subcategory) {
                 updatedblog.subcategory.push(subcategory)
             }
             if(data.tags){
                 updatedblog.tags.push(tag)
             }
             updatedblog.save()//this is to save the changes we have made from line no 69 to 74
             return res.status(200).send({ msg: true, data: updatedblog })
        }
        if(isPublished === false){
            const updatedblog = await BlogsModel.findOneAndUpdate({ _id: blogId , isDeleted:false}, { title: title, body: body,isPublished:isPublished, $unset:{publishedAt:1} }, { new: true })
            if (!updatedblog) return res.status(404).send({ status: false, msg: "No such blog present" })
            if (data.subcategory) {
             updatedblog.subcategory.push(subcategory)
            }
            if(data.tags){
                updatedblog.tags.push(tag)
            }
            updatedblog.save()
            return res.status(200).send({ msg: true, data: updatedblog })
       }
        const updatedblog = await BlogsModel.findOneAndUpdate({ _id: blogId , isDeleted:false, isPublished : true}, { title: title, body: body  }, { new: true })
        if (!updatedblog) return res.status(404).send({ status: false, msg: "No such blog present" })
        if (data.subcategory) {
            updatedblog.subcategory.push(subcategory)
        }
        if(data.tags){
            updatedblog.tags.push(tag)
        }
        updatedblog.save()
        return res.status(200).send({ msg: true, data: updatedblog })
    } catch (err) { res.status(500).send({ error: err.message }) }
}



const deleteByParams = async function (req, res) {
    try {
        let blogId = req.params.blogId
        let blog = await BlogsModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { deletedAt: new Date(), isDeleted: true })
       if (!blog) return res.status(404).send({ status: false, msg: "Blog is not present" })
        return res.status(200).send(" ")
    } catch (err) { return res.status(500).send({error:err.message}) }
}

//in this API we are not using middleware to authorize, we have written the authorization inside the API only
//In this API we are decoding the token and taking authorId from that token the we are adding this authorId in data in order to delete the blogs which satisfy all the given filter by user ,here user is deleting only those blogs which user have created
const deleteByQuery = async function (req, res) {
    try {
        let data = req.query;
        if(!Object.keys(data).lenght == 0) return res.status(400).send({msg:"Request is not valid"})
        data.isDeleted = false;
        let token = req.headers["x-api-key"]
         let decodedToken = jwt.verify(token, "Project-1-Blogging-site")
        // if(!decodedToken) return res.status(400).send({status:false,msg:"Invalid Token"})
        let Blogs = await BlogsModel.find(data)
        if(Blogs.length==0)return res.status(404).send({msg:"You have not written such blog "})
        let myId = Blogs.map(blog =>  {
        if(blog.authorId.toString() === decodedToken.authorId.toString()) return blog._id })   
        // await BlogsModel.updateMany({_id:{$in:myId}}, { $set:{isDeleted: true, deletedAt: new Date()} })
        await BlogsModel.updateMany({_id:myId}, { $set:{isDeleted: true, deletedAt: new Date()} })
        return res.status(200).send("blog has been deleted")
        
    } catch (err) {
        if( err.message=="invalid signature") return res.status(400).send({status: false , msg: "token is invalid"})
        if( err.message=="invalid token") return res.status(400).send({status: false , msg: "token is invalid"})
        return res.status(500).send({error:err.message}) }
}



module.exports= {createBlog,deleteByQuery,deleteByParams,updateBlog,getBlogs}



