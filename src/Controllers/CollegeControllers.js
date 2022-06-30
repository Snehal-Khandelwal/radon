const CollegeModel = require("../Models/CollegeModels.js");
const InternModel = require("../Models/InternModels.js");

function startUpperCase(x) {
    const a = x.split(" ");
    for (var i = 0; i < a.length; i++) {
        a[i] = a[i].charAt(0).toUpperCase() + a[i].slice(1).toLowerCase();
    }
    x = a.join(" ");
    return x
}



const college = async function (req, res) {
    try {
        let data = req.body;
        let CollegeName = data.fullName;
        data.fullName = startUpperCase(CollegeName);
        let createCollege = await CollegeModel.create(data);
        let myResult = await CollegeModel.findById(createCollege._id).select({_id:0,__v:0})
        res.status(201).send({ status: true, data: myResult })
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }

}


let getDetails = async function (req, res) {
    try {
        let collegeName = req.query.collegeName
        if (!collegeName) { return res.status(400).send({ status: false, msg: "collgeName is required" }) }
        collegeName = collegeName.trim()
        collegeName = collegeName.toLowerCase()
        let findName = await CollegeModel.findOne({ name: collegeName })
        if (!findName) { return res.status(400).send({ status: false, msg: "collge does not exists" }) }
        let id = findName._id.toString()
        let findIntern = await InternModel.find({ collegeId: id }).select({ name: 1, email: 1, mobile: 1 })
        if (!findIntern.length > 0) { return res.status(400).send({ status: false, msg: "No data found" }) }
        let newData = {
            name: collegeName,
            fullName: findName.fullName,
            logoLink: findName.logoLink,
            interns: findIntern
        }

        return res.status(200).send({ status: true, data: newData })
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}

module.exports = {
    college,
    getDetails
}