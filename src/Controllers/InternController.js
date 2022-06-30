const CollegeModels = require("../Models/CollegeModels.js");
const InternModel = require("../Models/InternModels.js");



const intern = async function (req, res) {
    try {
        let data = req.body;
        let collegeName = req.body.collegeName.toLowerCase()
       let collegeId = await  CollegeModels.findOne({name: collegeName}).select({_id:1})
       let _id = collegeId._id
       let data1 = {
        name : data.name,
        email : data.email,
        mobile : data.mobile,
        collegeId : _id
       }
        let createIntern = await  InternModel.create(data1);
        res.status(201).send({ status: true, data: createIntern })
    } catch (err) {
        res.status(500).send({ error: err.message })
    }

}


module.exports = {
    intern
}