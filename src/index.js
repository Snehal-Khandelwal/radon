const express = require('express');
var bodyParser = require('body-parser');
const (default:mongoose)= require("mongoose")

const route = require('./routes/route.js');
 const app = express()
 
 
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://snehal_3497:snehal3497@atlascluster.q9xoryr.mongodb.net/snehal3497-DB?retryWrites=true&w=majority", {
    useNewUrlParser : true

})
.then( 0 => console.log("mongoDB is Connected"));
.catch (err => console.log("err"))


app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

