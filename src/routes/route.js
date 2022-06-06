const express = require('express');
const { param } = require('express/lib/request');
const underscore = require('underscore')

const router = express.Router();


let movies =['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins']
router.get('/movies', function(req, res){
    res.send(movies)
   
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

   router.get('/film1/:filmId',function(req,res){
       let filmsID= req.params.filmId
       console.log(filmsID)
       let myFilm= film[filmsID-1]
       if(filmsID<=film.length){
        //    res.send(film[i-1])
        res.send(myFilm)
       }
       else{
           res.send("No movie exist with this ID")
       }
       
   })
   router.get('/film2',function(req,res){
    let i= req.query.id
    if(i<=film.length){
        res.send(film[i-1])
    }
    else{
        res.send("No movie exist with this ID")
    }
    
})
module.exports = router;