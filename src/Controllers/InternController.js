const CollegeModels = require("../Models/CollegeModels.js");
const InternModel = require("../Models/InternModels.js");

function startUpperCase(x) {
    const a = x.split(" ");
    for (var i = 0; i < a.length; i++) {
        a[i] = a[i].charAt(0).toUpperCase() + a[i].slice(1).toLowerCase();
    }
    x = a.join(" ");
    return x
}


const intern = async function (req, res) {
    try {
        let data = req.body;
        let collegeName = req.body.collegeName.toLowerCase()
       let collegeId = await  CollegeModels.findOne({name: collegeName}).select({_id:1})
       let data1 = {
        name : startUpperCase(data.name),
        email : data.email,
        mobile : data.mobile,
        collegeId : collegeId._id
       }
        let createIntern = await  InternModel.create(data1);
        let myResult = await InternModel.findById(createIntern._id).select({_id:0,__v:0})
        res.status(201).send({ status: true, data: myResult })
    } catch (err) {
        res.status(500).send({ error: err.message })
    }

}


module.exports = {
    intern
}