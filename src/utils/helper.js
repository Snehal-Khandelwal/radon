const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const printDate = function(){
    const myDate= new Date()
    console.log(myDate);
}
const printMonth = function(){
    const myDate= new Date()
    const myMonth = monthList[myDate.getMonth()]
    console.log(myMonth);

}
const getBatchInfo= function(){
    console.log("Radon, W3D3, the topic for today is Nodejs module system’")
}
module.exports.printDate = printDate
module.exports.printMonth = printMonth
module.exports.getBatchInfo = getBatchInfo