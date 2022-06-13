const mid1 = function(req,res,next){

if(req.header.isFreeAppUser==true && req.header.isFreeAppUser==false){
    next()
}
else{
    res.send("request is missing mandatory header field")
}
}

module.export.mid1 = mid1