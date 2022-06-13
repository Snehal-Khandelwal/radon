const UserModel= require("../models/userModel")
const ProductModel= require("../models/productModel")
const OrderModel= require("../models/orderModel")



const mid1 = function(req,res,next){
if(req.headers["isfreeappuser"]===undefined){
    console.log(req.headers)
    res.send("request is missing mandatory header field")
}
else {
 next()
}
}


const mid2= function(req,res,next){
    let data = req.headers["isfreeappuser"]
    if(data){
        res.send({status:false, msg:"header data is not present"})
    }
    if(data===true){
        req.body.isfreeappuser = true
    }
    else{
        req.body.isfreeappuser = false
    }
    next()
    
}

const idCheck= async function(req,res,next){
    myUser_id = req.body["user_id"]
    myProduct_id = req.body["product_id"]
     myProductId= await ProductModel.findById(myProduct_id)
    myUserId= await UserModel.findById(myUser_id)
if(myProductId && myUserId){
    next()
}
else{
    res.send({error:"invalid userId or productId"})

}
}
module.exports.mid1 = mid1
module.exports.mid2 = mid2
module.exports.idCheck = idCheck