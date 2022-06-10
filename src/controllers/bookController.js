const authorModel = require("../models/newAuthorModel")
const bookModel = require("../models/newBookModel")
const publisherModel = require("../models/newPublisherModel")



const createBook = async function (req, res) {
    let publisher1 = req.body.publisher
    let author1 = req.body.author
    let publisherId = await publisherModel.findOne({ _id: publisher1 })
    let authorId = await authorModel.findOne({ _id: author1 })
    if (publisher1 && author1) {
        if (publisherId === null) {
            res.send("publisher  not present")
        } else if (authorId == null) {
            res.send("Author is not present")
        }
        else {
            let bookCreated = await bookModel.create(book)
            res.send({ data: bookCreated })
        }
    }
    else{res.send("Data require")}
}

const getBooksWithCompleteDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author').populate('publisher')
    res.send({ data: specificBook })
}

const updateBookData = async function (req, res) {
    let check1 = await publisherModel.find(
        {name: "Penguin"}).select({_id:1})
        // {$or:{name: "Penguin", name: "HaperCollin" }}).select({_id:1})
        // {name:{$or:{{$eq:"Penguin"},{$eq:"HaperCollin"}}}}
        // ).select('_id')
        for (let i = 0; i < check1.length; i++) {
    let specificBook = await bookModel.updateMany({ publisher: check1[i] }, { $set: { isHardCover: true } })
    res.send({ data: specificBook })
        }
}
const updateBookData1 = async function (req, res) {
    let check1 = await authorModel.find({ ratings: { $gt: 3.5 } }).select({_id:1})
    for (let i = 0; i < check1.length; i++) {
        let specificBook = await bookModel.updateMany({ author: check1[i] }, { $inc: { price: 10 } })
        res.send({ data: specificBook })
    }

}




module.exports.updateBookData = updateBookData
module.exports.updateBookData1 = updateBookData1
module.exports.createBook = createBook
module.exports.getBooksWithCompleteDetails = getBooksWithCompleteDetails
