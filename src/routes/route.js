const express = require('express');
const lodash = require('lodash');
const externalModule = require('../logger/logger.js')
const externalModule1 = require('../utils/helper.js')
const externalModule2 = require('../validator/forMatter.js')

const router = express.Router();


router.get('/test-me', function (req, res) {
   externalModule.welComeNote();
    res.send('My first ever api!')
});

router.get('/test-me1', function (req, res) {
    externalModule1.printDate();
    externalModule1.printMonth();
    externalModule1.getBatchInfo();
    res.send('My second ever api!')
});

router.get('/test-me2', function (req, res) {
    externalModule2.trimFunc()
    externalModule2.changeToLower()
    externalModule2.changeToUpper()
     res.send('My third api!')
});
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

router.get('/Hello', function(req, res){
console.log(lodash.chunk(months , 3))
const myArray = [1,3,5,7,9,11,13,15,17,19]
const numbers=lodash.tail(myArray)
console.log(numbers);
return res.send(numbers)
})
router.get('/Hello1', function(req, res){
    
    const finalArr = lodash.union([1,2,3,4],[2,5,6,7], [5,6,3,9], [15,68],[24,15,34])
    console.log(finalArr)
    let pairs = [["one",1],["two",2]]
    console.log(lodash.fromPairs(pairs))
})
module.exports = router;
// adding this comment for no reason