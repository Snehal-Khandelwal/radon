const UserModel= require("../models/userModel")
const ProductModel= require("../models/productModel")
const OrderModel= require("../models/orderModel")


const createUser= async function (req, res) {
    let data= req.body
    const myUser = await UserModel.create(data)
    res.send({msg: myUser})
}
const createProduct= async function (req, res) {
    let data= req.body
    const myProduct = await ProductModel.create(data)
    res.send({msg: myProduct})
}

const createOrder = async function (req,res){
   let isFreeAppUser = req.header.isFreeAppUser
   if(isFreeAppUser===true){
    req.body.isFreeAppUser = true;
    req.body.amount = 0

   }
   else if(isFreeAppUser===false){
    productId = req.body.product_id
    userId= req.body.user_id
    productPrice = await ProductModel.findbyId(productId).select({price:1, _id:0})
    amount = await UserModel.findById(userId).select({amount:1, _id:0})
    if(productPrice<amount){
        req.body.amount = amount - productPrice;
        req.body.isFreeAppUser = false
        myOrder = await OrderModel.create(req.body)
        req.send({msg:req.body})

    }
    else{
        req.send("You dont have sufficient Balance")
    }

   }
}
 



module.exports.createUser= createUser
module.exports.createProduct= createProduct
module.exports.createOrder= createOrder
