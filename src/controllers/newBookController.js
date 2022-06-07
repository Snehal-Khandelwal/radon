const authorModel = require("../models/authorModel")
const newBookModel= require("../models/newBookModel")

const createAuthor= async function (req, res) {
    let data= req.body
    let savedData= await authorModel.create(data)
    res.send({msg: savedData})
}

const createNewBook= async function (req, res) {
    let data= req.body
    let savedData= await newBookModel.create(data)
    res.send({msg: savedData})
} 
const findBookByAuthor = async function (req,res){
let requiredId = await authorModel.find({ author_name:"Chetan Bhagat"}).select({author_id:1, _id:0})
let requiredBook = await newBookModel.find({author_id:requiredId[0].author_id})
res.send({msg:requiredBook})
}
const anotherBook = async function (req,res){
let data = await newBookModel.findOneAndUpdate({bookName:"Two States"},{price:100},{new:true}).select({author_id:1 , _id:0})
let authorName = await authorModel.find(data).select({author_name:1 , _id:0})
let requiredPrice = await newBookModel.find({bookName:"Two States"}).select({price:1,_id:0})
res.send({"The author name is":authorName,"required Price is ": requiredPrice})

}

const theAuthorList = async function(req,res){
    let authorId= await newBookModel.find( { price : { $gte: 50, $lte: 100} } ).select({ author_id :1, _id:0})
    let mydata=[]
   for (let i=0;i<authorId.length;i++){
       data=await authorModel.find(authorId[i]).select({author_name:1,_id:0})
       mydata.push(data)
    }
    res.send(mydata)
    
}

module.exports.createNewBook= createNewBook
module.exports.findBookByAuthor= findBookByAuthor
module.exports.createAuthor= createAuthor
module.exports.anotherBook= anotherBook
module.exports.theAuthorList= theAuthorList
