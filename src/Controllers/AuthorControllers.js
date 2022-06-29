const AuthorModel = require("../Models/authorModel.js");
const jwt = require("jsonwebtoken");

//this function is to check whether given email id is in its valid format or not
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
 

//Here we are demonding a string password from the user which should contain upper care and lower case alphabates, number and special charector
function validatePassword(password)
{
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    return re.test(password);
}

//this function is to make sure that the given field starts with the alphabates only
function validate(data){
    let re = /^[a-zA-Z]*$/;
    return re.test(data)
    }

    //this fuction is to check whether user have enter all the fields which are mandatory and input is string but not a empty one
const isValid = function (value) {
    if (!validate(value))return false;
    if (typeof value === "undefined" || value === null ) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};


const createAuthor = async function (req, res) {
    try {
        const data = req.body
        if(!data) return res.status(400).send({msg:"Please Enter valid details"})
        //we know fname, lname, title,email and password are mandatory field so we have tried to valideate these things in proper format
        if (!isValid(data.fname))  return res.status(400).send({ msg: "fname is required" })
        if (!isValid(data.lname)) return res.status(400).send({ msg: "lname is required" })
        if (!data.title) {
            return res.status(400).send({ msg: "title is required" })
         }else if (data.title != 'Mr' && data.title != 'Mrs' && data.title != 'Miss') {
            return res.status(400).send({ msg: "Invalid Title : Valid titles : Mr,Miss,Mrs" })
        }
        if (!validateEmail(data.email)) return res.status(400).send({ msg: "please enter valid email id" })
        const alreadyUsed = await AuthorModel.findOne({email:data.email})
        if(alreadyUsed) return res.status(400).send({msg:"Email is already used"})
        if (!validatePassword(data.password))  return res.status(400).send({msg: "A strong password needed.It should contain min 8 letter, with at least a symbol, upper and lower case letters and a number" })
        const myAuthor = await AuthorModel.create(data)
        return res.status(201).send({ status: true, Data: myAuthor })
    }catch (err) {res.status(500).send({ msg: err.message })}

}
const authorLogin = async function (req, res) {
    try{
    let authorEmail = req.body.email;
    let password = req.body.password;
    //here we are helping user to enter valid email id
    if (!validateEmail(authorEmail))  return res.status(400).send({ msg: "please enter valid email id" })
    if (!password.trim())  return res.status(400).send({ msg: "Password is required" })
    let author = await AuthorModel.findOne({ emailId: authorEmail, password: password });
    if (!author)return res.status(400).send({status: false,msg: "username or the password is not corerct", });
    let token = jwt.sign({authorId: author._id.toString()}, "Project-1-Blogging-site");
    res.status(200).setHeader("x-api-key", token);
    res.status(200).send({ status: true, message: "login Successful", data:{token: token }})
    }catch(err){return res.status(500).send({ msg: err.message })}}


module.exports.createAuthor = createAuthor
module.exports.authorLogin = authorLogin