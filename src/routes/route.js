const express = require('express');
const { param } = require('express/lib/request');
const underscore = require('underscore')

const router = express.Router();


let movies =['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins']
router.get('/movies', function(req, res){
   
})

router.get('/movies/:index', function(req, res){
    
    let i = req.params.index;
    let movieName= movies[i]
    if(i<movies.length){

        res.send(movieName)
    }
    else{
        res.send("invalid Index")
    }

    
})

let film = [ {
    "id": 1,
    "name": "The Shining"
   }, {
    "id": 2,
    "name": "Incendies"
   }, {
    "id": 3,
    "name": "Rang de Basanti"
   }, {
    "id": 4,
    "name": "Finding Nemo"
   }]
   
   router.get('/film', function(req, res){
    res.send(film)
   })

   router.get('/film',function(req,res){
       let id= req.query.id
       requiredFilm= film.id;
       res.send(requiredFilm)
   })
module.exports = router;
// adding this comment for no reason