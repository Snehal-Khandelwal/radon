const myString = ' FunctionUp '
const trimFunc = function(){
    console.log(myString.trim())
}
const changeToLower = function(){
    console.log(myString.toLowerCase())
}
const changeToUpper = function(){
    console.log(myString.toUpperCase())
}
module.exports.myString = myString;
module.exports.trimFunc = trimFunc;
module.exports.changeToLower = changeToLower;
module.exports.changeToUpper = changeToUpper;
