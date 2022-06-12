const express = require('express');
const moment = require ('moment')
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://snehal_3497:snehal_3497@atlascluster.q9xoryr.mongodb.net/snehalMid?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

// app.use ( 
//     function (req, res, next) {
//         console.log ("inside GLOBAL MW");
//         next();
//   })
const myMid = (req,res,next) => {
    let myDate = moment().format('LTS')+"   "+moment().format('L')
    let ipAddress = req.ip
    let myroute = req.originalUrl
    console.log(myDate+"     "+ipAddress+"     "+myroute)

    next()

}
app.use(myMid)

app.use('/', route);

// app.use(myMid)

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
