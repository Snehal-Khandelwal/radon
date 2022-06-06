const res = require("express/lib/response")
const bookModel = require("../models/bookModel")
const BookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let data= req.body
    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const getBooksData= async function (req, res) {
    let allBooks= await BookModel.find().select({ bookName : "The C Programming" , authorName :  "Robin Roy"});
    res.send({msg: allBooks})
}


const getBooksInYear = async function(req,res){
    let requiredYear = req.body;
    let yearWiseBook = await BookModel.find(requiredYear);
    res.send({msg : yearWiseBook})
}
const getPerticularBook = async function(req,res){
    let data = req.body
    let perticularBook = await bookModel.find(data);
    res.send(perticularBook)
}

const getXINRBook = async function(req,res){
    let INRBooks = await BookModel.find({prices:{$or:[{indianPrice:"100INR"},{indianPrice:"200INR"},{indianPrice:"500INR"}]}});
    res.send(INRBooks)
}

const getRandomBook = async function(req,res){
    let randomBooks= await BookModel.find({$or:[{stockAvailable:true},{totalPages:$gt500}]});
    res.send({msg: allBooks})
}


module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksInYear= getBooksInYear
module.exports.getPerticularBook= getPerticularBook
module.exports.getXINRBook= getXINRBook
module.exports.getRandomBook= getRandomBook
