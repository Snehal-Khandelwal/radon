const AuthorModel = require("../models/authorModel.js");
const jwt = require("jsonwebtoken")

//====================Regex===========================//
    const emailV= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordV = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;


//============validator function==================//
const validator = function (value) {
    if(!/^[a-zA-Z]*$/.test(data)) return false
    if (typeof value === "undefined" || value === null ) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

//=================create Author =================//
const createAuthor = async function (req, res) {
    try {
        const {fname , lname , title , email , password} = req.body
        if(!Object.keys(req.body).length == 0) return res.status(400).send({status: false ,msg:"Please Enter valid details"})
        if (!validator(fname))  return res.status(400).send({status:false , msg: "fname is required" })
        if (!validator(lname)) return res.status(400).send({status:false ,  msg: "lname is required" })
        if (!title.trim())  return res.status(400).send({ status: false ,msg: "title is required" })
        // if (title != 'Mr' && title != 'Mrs' && title != 'Miss')  return res.status(400).send({ msg: "Invalid Title : Valid titles : Mr,Miss,Mrs" })
        if(!["Mr","Miss","Mrs"].includes(title)) return res.status(400).send({ status: false ,msg: "Invalid title, title should be one of (Mr,Miss,Mrs)" })
        if (!emailV.test(email)) return res.status(400).send({ status:false ,msg: "please enter valid email id" })
        const alreadyUsed = await AuthorModel.findOne({email:email})
        if(alreadyUsed) return res.status(400).send({msg:"Email is already used"})
        if (!passwordV.test(password))  return res.status(400).send({msg: "A strong password needed.It should contain min 8 letter, with at least a symbol, upper and lower case letters and a number" })
        const myAuthor = await AuthorModel.create(req.body)
        return res.status(201).send({ status: true, Data: myAuthor })
    }catch (err) {res.status(500).send({ msg: err.message })}}


    //=================Author login =================//
const authorLogin = async function (req, res) {
    try{
    const {email , password} = req.body
    if (!emailV.test(email))  return res.status(400).send({ status:false,msg: "please enter valid email id" })
    if (!password.trim())  return res.status(400).send({status:false,msg: "Password is required" })
    let author = await AuthorModel.findOne({ email:email, password: password });
    if (!author)return res.status(400).send({status: false,msg: "username or the password is not corerct", });
    let token = jwt.sign({authorId: author._id}, "Project-1-Blogging-site");
    res.status(200).setHeader("x-api-key", token);
    res.status(200).send({ status: true, mesg: "login Successful"})
    }catch(err){return res.status(500).send({status:false ,  msg: err.message })}}


module.exports={createAuthor,authorLogin, validator}