const AuthorModel= require("../models/newAuthorModel")
const BookModel= require("../models/newBookModel")
const PublisherModel= require("../models/newPublisherModel")

const createAuthor= async function (req, res) {
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.send({data: authorCreated})
}
const createPublisher= async function (req, res) {
    let publisher = req.body
    let authorCreated = await PublisherModel.create(publisher)
    res.send({data: authorCreated})
}



module.exports.createAuthor= createAuthor
module.exports.createPublisher= createPublisher
