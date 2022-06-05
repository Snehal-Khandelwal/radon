const bookModel= require("../models/bookModel")

const createBookList= async function (req, res) {
     let data= req.body
     let savedList= await bookModel.create(data)
     res.send({msg: savedList})
}

const getBookList= async function (req, res) {
    let allBooks= await bookModel.find()
    res.send({msg: allBooks})
}

module.exports.createBookList= createBookList
module.exports.getBookList= getBookList