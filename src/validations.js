const mongoose = require("mongoose");
const CollegeModels = require("./Models/CollegeModels");
const InternModel=require("./Models/InternModels")
// var validUrl = require('valid-url');
// const URL = require("url").URL;

let mobile1=/^[0-9]{10}$/;
let re = /^[a-zA-Z\-]+$/;
//  let re = /^[a-z]+$/;
let email1 = /^[a-zA-Z][a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/;
let regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

function x(data) {
    if (!data || data == null || data === undefined || data.trim() == 0) return false;
    return true

}

const checkBody = async function(req,res,next){
  try{let data = req.body
  if (Object.keys(data).length == 0) {return res.status(400).send({status : false, msg : "Bad request- Please enter details in the request Body "})}
  next()
}catch(err){
  res.status(500).send({error : err.messsage})
}}


const validator1 = async function (req, res, next) {
    try {
        let name = req.body.name;
        if (!x(name)) return res.status(400).send({ status: false, message: "Please enter name, It should be the abbrivation of fullName of your college" })
        if (!name.match(re)) return res.status(400).send({ status: false, message: "Please enter name, It should be the abbrivation of fullName of your college" })
        let usedname = await CollegeModels.findOne({ name: name })
        if (usedname) return res.status(409).send({ status: false, message: "This name is already been used" })

        let fullName = req.body.fullName;
        if (!x(fullName)) return res.status(400).send({ status: false, message: "Please enter fullName" })
      


        let logoLink = req.body.logoLink;
        if (!x(logoLink)) return res.status(400).send({ status: false, message: "Please enter LogoLink" })
        if (!logoLink.match(regex)) return res.status(400).send({ status: false, message: "Please enter valid LogoLink" })

        next()
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}


const validator2 = async function (req, res, next) {
    try {
        let name = req.body.name;
        if (!x(name)) return res.status(400).send({ status: false, message: "Please enter name" });

        let email = req.body.email;
        if (!x(email)) return res.status(400).send({ status: false, message: "Please enter email" })
        if (!email.match(email1)) return res.status(400).send({ status: false, message: "Please Enter Valid email" })
        let usedemail = await InternModel.findOne({ email: email })
        if (usedemail) return res.status(409).send({ status: false, message: "This emailId has already been used" })

        let mobile = req.body.mobile;
        if (!mobile) return res.status(400).send({ status: false, message: "Please enter mobile" })
        if (!mobile.match(mobile1)) return res.status(400).send({ status: false, message: "Please Enter Valid Mobile Number" })
        let usedmobile = await InternModel.findOne({mobile:mobile})
        if (usedmobile) return res.status(409).send({ status: false, message: "This mobile number has already been used" })

        let collegeName = req.body.collegeName
        // if (!mongoose.Types.ObjectId.isValid(collegeId)) return res.status(400).send({ status: false, message: "Please Enter Valid collegeId" })
        let presentCollegeId = await CollegeModels.findOne({ name: collegeName })
        if (!presentCollegeId) return res.status(404).send({ status: false, message: "collegeName not exist" })

        next();
        
    } catch (err) {
        res.status(500).send({ error: err.message })
    }

}

module.exports = { validator1, validator2 ,checkBody}